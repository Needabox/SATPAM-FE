import { Fragment, ReactNode } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ReactElement } from 'react'
import ModalButton from './ModalButton'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type ModalProps = {
    modalTitle: string,
    children: ReactNode,
    isOpen: boolean,
    handleCancelAction: () => void,
    handleConfirmAction: () => void
}

const Modal = ({
    modalTitle,
    children,
    isOpen,
    handleCancelAction,
    handleConfirmAction
}: ModalProps): ReactElement => {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
            <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <div className="flex flex-col divide-y">
                            <Dialog.Title as="h3" className="flex flex-col gap-2 mb-7">
                                <div className='flex justify-end'>
                                    <ModalButton className='inline-flex w-full justify-center rounded-md px-3 py-2 font-semibold text-xl bg-white hover:shadow-md sm:ml-3 sm:w-auto' onClick={handleCancelAction}>
                                        <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                                    </ModalButton>
                                </div>
                                <div className='flex justify-center items-center'>
                                    <img src={modalTitle} alt="" width="150" />
                                </div>
                            </Dialog.Title>
                            <div className="py-7">
                                {children}
                            </div>
                        </div>
                        <div className="flex justify-center items-center mt-5">
                            <ModalButton className='inline-flex justify-center rounded-md bg-blue-900 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800' onClick={handleConfirmAction}>
                                Print Ticket
                            </ModalButton>
                        </div>
                    </Dialog.Panel>
                </Transition.Child>
            </div>
            </div>
        </Dialog>
        </Transition.Root>
    )
}

export default Modal
