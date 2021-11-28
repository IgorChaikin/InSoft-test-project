import { connect } from 'react-redux';
import CardAdding from '../../components/Shipment/CardAdding/CardAdding';

import { addCard, changeValue } from '../../actions/actions.shipment';

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (values) => dispatch(addCard(values)),
  onExit: () => dispatch(changeValue({ key: 'isCardAdding', value: false })),
});

const mapStateToProps = (state) => ({
  paymentError: state.shipment.paymentError,
  isCardAdding: state.shipment.isCardAdding,
});

export default connect(mapStateToProps, mapDispatchToProps)(CardAdding);
