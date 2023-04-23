import React, { useEffect, useState } from "react"
import { Button, Input, Modal } from "antd"
import { db } from "../../../utils/firebase"

export default function UpdateDescriptionModal({
  documentId,
  currentDescription,
}) {
  const [open, setOpen] = useState(false)
  const [description, setDescription] = useState(currentDescription)

  useEffect(() => {
    setDescription(currentDescription)
  }, [currentDescription])

  const showModal = () => {
    setOpen(true)
  }

  const handleOk = () => {
    const changeDescription = async () => {
      db.collection("users").doc(documentId).update({
        description: description,
      })
      setDescription("")
      setOpen(false)
    }
    changeDescription()
  }
  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <>
      <Button onClick={showModal}>Edit description</Button>
      <Modal
        title="Edit Description"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          label="Description"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </Modal>
    </>
  )
}
