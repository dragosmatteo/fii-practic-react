import React, { useState } from "react"
import { InboxOutlined } from "@ant-design/icons"
import { Button, message, Upload, Modal, Input } from "antd"
import { v4 as uuid } from "uuid"
import firebase, { auth, db, storage } from "../../../utils/firebase"

const { Dragger } = Upload

export default function UploadMemeModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState()
  const [caption, setCaption] = useState("")

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
    db.collection("memes").add({
      caption,
      imageUrl,
      username: auth.currentUser.displayName,
      userId: auth.currentUser.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
  }

  const handleUpload = () => {
    const imageName = `${file.name}_${uuid()}`

    storage
      .ref(`memes/${imageName}`)
      .put(file)
      .then((snapshot) => {
        if (snapshot.state === "success") {
          storage
            .ref("memes")
            .child(imageName)
            .getDownloadURL()
            .then(async (imageUrl) => {
              await onSuccess(imageUrl)
              setIsOpen(false)
              setFile()
              setCaption("")
            })
        }
      })
      .catch((err) => message.error(`${imageName} failed to upload.`))
  }

  return (
    <>
      <Button onClick={showModal}>Upload Meme</Button>
      <Modal
        title="Upload Meme"
        open={isOpen}
        onOk={handleUpload}
        onCancel={closeModal}
      >
        <Input
          label="Caption"
          placeholder="Meme caption"
          onChange={(e) => setCaption(e.target.value)}
        />
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
