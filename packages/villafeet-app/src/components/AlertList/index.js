import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
  updateAlerts(alerts) {
    this.setState({ alerts });
  }
  componentDidMount(){
    this.setState({ alerts: AlertService.getAlerts() });
    AlertService.subscribe((alerts) => this.updateAlerts(alerts));
  }
  calculateTopPosition(index) {
    const gap = 16;
    const alertHeight = 56;
    return `${(alertHeight * index) + (gap * index)}px`;
  }
  getAnimationClasses() {
    return {
      enter: styles.AlertItemEnter,
      enterActive: styles.AlertItemEnterActive,
      enterDone: styles.AlertItemEnterDone,
      exit: styles.AlertItemExit,
      exitActive: styles.AlertItemExitActive,
     }
  }
  render() { 
    const { alerts } = this.state;
    const AlertListContainer = document.getElementById('app-alerts');
    return ReactDOM.createPortal(
      <div className={styles.AlertList}>
        <TransitionGroup>
          {alerts.map((alert, index) => {
            const itemStyle = { top: this.calculateTopPosition(index) };
            return (
              <CSSTransition
                key={index}
                timeout={1000}
                classNames={this.getAnimationClasses()}>
                <div className={styles.AlertItemWrapper}>
                  <ThemeAlert key={index} className={styles.AlertItem} style={itemStyle} {...alert} />
                </div>
              </CSSTransition>
            )
          })}
        </TransitionGroup>
      </div>,
      AlertListContainer
    );
  }
}
 
export default AlertList;