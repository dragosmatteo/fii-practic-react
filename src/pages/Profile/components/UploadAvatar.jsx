import React, { useState } from "react"
import { InboxOutlined } from "@ant-design/icons"
import { Button, message, Upload, Modal } from "antd"
import { v4 as uuid } from "uuid"
import { auth, db, storage } from "../../../utils/firebase"

const { Dragger } = Upload

export default function UploadAvatar() {
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState()

  const showModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const uploadProps = {
    onRemove: () => {
      setFile(null)
    },
    beforeUpload: (file) => {
      setFile(file)
      return false
    },
    fileList: file ? [file] : [],
  }

  async function onSuccess(imageUrl) {
    await auth.currentUser.updateProfile({
      photoURL: imageUrl,
    })

    await db.collection("users").onSnapshot((snapshot) => {
      const userRecord = snapshot.docs.find(
        (doc) => doc.data().userId === auth?.currentUser?.uid
      )
      db.collection("users").doc(userRecord.id).update({
        avatarUrl: imageUrl,
      })
    })
  }

  const handleUpload = () => {
    const imageName = `${file.name}_${uuid()}`

    storage
      .ref(`avatars/${imageName}`)
      .put(file)
      .then((snapshot) => {
        if (snapshot.state === "success") {
          storage
            .ref("avatars")
            .child(imageName)
            .getDownloadURL()
            .then(async (imageUrl) => {
              await onSuccess(imageUrl)
              setIsOpen(false)
              setFile()
            })
        }
      })
      .catch((err) => message.error(`${imageName} failed to upload.`))
  }

  return (
    <>
      <Button onClick={showModal}>Upload Avatar</Button>
      <Modal
        title="Upload Avatar"
        open={isOpen}
        onOk={handleUpload}
        onCancel={closeModal}
      >
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </Modal>
    </>
  )
}
