import React from 'react';
import ReactDOM from 'react-dom';
import styles from './AlertList.module.scss';
import ThemeAlert from './../ThemeAlert';
import AlertService from './../../services/AlertService';

class AlertList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alerts: []
    }
  }
  updateAlerts(alerts){
    this.setState({ alerts });
  }
  componentDidMount(){
    this.setState({ alerts: AlertService.getAlerts() });
    AlertService.subscribe((alerts) => this.updateAlerts(alerts));
  }
  calculateTopPosition(index){
    const gap = 16;
    const alertHeight = 56;
    return `${(alertHeight * index) + (gap * index)}px`;
  }
  render() { 
    const { alerts } = this.state;
    return ReactDOM.createPortal(
      <div id="alert-list" className={styles.AlertList}>
        {alerts.map((alert, index) => {
          const itemStyle = { top: this.calculateTopPosition(index) };
          return (
            <ThemeAlert key={index} className={styles.AlertItem} style={itemStyle} {...alert} />
          )
        })}
      </div>,
      document.getElementById('app-alerts')
    );
  }
}
 
export default AlertList;