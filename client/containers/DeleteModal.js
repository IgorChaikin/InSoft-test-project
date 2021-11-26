import { connect } from 'react-redux';
import DeleteModal from '../components/DeleteModal/DeleteModal';
import { cancelDeleted as cancelDeletedUser, deleteUser } from '../actions/actions.admin.users';
import { cancelDeleted as cancelDeletedOrder, deleteOrder } from '../actions/actions.staff.orders';

const mapDispatchToProps = (dispatch, ownProps) => {
  const { entity } = ownProps;
  let onClose;
  let onDelete;
  switch (entity) {
    case 'user': {
      onClose = () => dispatch(cancelDeletedUser());
      onDelete = (id) => dispatch(deleteUser(id));
      break;
    }
    case 'order': {
      onClose = () => dispatch(cancelDeletedOrder());
      onDelete = (deletedId, id) => dispatch(deleteOrder(deletedId, id));
      break;
    }
    default:
      break;
  }
  return {
    onClose,
    onDelete,
  };
};

const mapStateToProps = (state, ownProps) => {
  const { entity } = ownProps;
  let deletedId;
  let selectedId;

  switch (entity) {
    case 'user': {
      deletedId = state.users.deletedId;
      selectedId = null;
      break;
    }
    case 'order': {
      deletedId = state.stafforders.deletedId;
      selectedId = state.stafforders.selectedId;
      break;
    }
    default:
      break;
  }

  return {
    entity,
    deletedId,
    selectedId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);