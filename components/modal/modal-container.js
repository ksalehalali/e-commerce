import { useCallback } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import * as constants from "../../redux/modal/constants";
import { closeModal, openModal } from "redux/modal/action";
//components
import LoginModal from "./login/login-modal";
import RegisterModal from "./register/register-modal";
import DeliveryAddressModal from "./delivery-address/delivery-address";
import DeliveryAddressConfirmModal from "./delivery-address/confirm";
import ChargeWalletModal from "./charge-wallet/charge-wallet-modal";

function ModalContainer() {
  const { visible, modalType, successAction } = useSelector(
    (state) => state.modal
  );
  const dispatch = useDispatch();

  const onClose = useCallback(() => dispatch(closeModal()), []);
  const toggleModal = useCallback(
    (targetClose, targetOpen) => {
      dispatch(closeModal());
      dispatch(openModal(targetOpen, successAction));
    },
    [dispatch, successAction]
  );

  return (
    <>
      {modalType === constants.modalType_Login && (
        <LoginModal visible={visible} onClose={onClose} />
      )}
      {modalType === constants.modalType_register && (
        <RegisterModal visible={visible} onClose={onClose} />
      )}
      {modalType === constants.modalType_delivery_address && (
        <DeliveryAddressModal
          visible={visible}
          onClose={onClose}
          toggleModal={toggleModal}
          constants={constants}
        />
      )}
      {modalType === constants.modalType_delivery_address_confirm && (
        <DeliveryAddressConfirmModal visible={visible} onClose={onClose} />
      )}
      {modalType === constants.modalType_charge_wallet && (
        <ChargeWalletModal
          visible={visible}
          successAction={successAction}
          onClose={onClose}
        />
      )}
    </>
  );
}

export default ModalContainer;
