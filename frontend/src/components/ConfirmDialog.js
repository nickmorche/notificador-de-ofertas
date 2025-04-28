import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"

const ConfirmDialog = ({ isOpen, onCancel, onConfirm }) => {
  return (
    <Dialog.Root open={isOpen} role="alertdialog" >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Você tem certeza?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>Essa ação não pode ser desfeita.</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={onCancel}>
                  Cancelar
                </Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" onClick={onConfirm}>
                Deletar
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild onClick={onCancel}>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default ConfirmDialog;