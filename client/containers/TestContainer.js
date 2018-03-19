import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as testActions from './../actions/testActions';

const mapStateToProps = state => ({
  test: state.test,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...testActions }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
);
