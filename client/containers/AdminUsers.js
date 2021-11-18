import { connect } from 'react-redux';
import AdminUsers from '../components/AdminUsers/AdminUsers';
import {
  fetchUsers,
  addChange,
  updateUsers,
  fetchRoles,
  selectDeleted,
  search,
} from '../actions/actions.admin.users';

const mapDispatchToProps = (dispatch) => ({
  onMount: () => {
    dispatch(fetchUsers());
    dispatch(fetchRoles());
  },
  onAdd: (change) => dispatch(addChange(change)),
  onSearch: (searchData) => dispatch(search(searchData)),
  onApply: (changes) => dispatch(updateUsers(changes)),
  onSelectDeleted: (id) => dispatch(selectDeleted(id)),
});

const mapStateToProps = (state) => {
  console.log(state.users.searchData);
  return {
    users: state.users.users.filter(
      (elem) =>
        elem.lastName?.indexOf(state.users.searchData.lastName) !== -1 &&
        elem.firstName?.indexOf(state.users.searchData.firstName) !== -1 &&
        elem.patronymic?.indexOf(state.users.searchData.patronymic) !== -1 &&
        (state.users.searchData.roleId === null || elem.roleId === state.users.searchData.roleId) &&
        (state.users.searchData.isActive === null ||
          elem.isActive === state.users.searchData.isActive)
    ),
    roles: state.users.roles,
    isChanged: state.users.isChanged,
    username: state.auth.username,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);
