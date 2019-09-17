
class AlertService {
  constructor(alertVisibleTime) {
    this.alerts = new Map()
    this.subscribers = []
    this.alertVisibleTime = alertVisibleTime || 3000;
  }

  triggerAlert(alert = {}) {
    const index = alert.id || this.alerts.size;
    this.alerts.set(index, alert)
    this._notifySubscribers(this.subscribers, this.alerts)
    this._setAlertTimeout(index);
  };
  
  triggerAlerts(alerts = []) {
    alerts.forEach( (alert) => {
      const index = alert.id || this.alerts.size;
      this.alerts.set(index, alert)
      this._setAlertTimeout(index);
    });
    this._notifySubscribers(this.subscribers, this.alerts)
  };

  getAlerts() {
    return [...this.alerts.values()].reverse()
  }

  _notifySubscribers(){
    this.subscribers.forEach(callback => {
      callback([...this.alerts.values()].reverse())
    })
  }
  
  _setAlertTimeout = (index) => {
    setTimeout(() => {
      this.alerts.delete(index);
      this._notifySubscribers();
    }, this.alertVisibleTime)
  }
  
  // TODO: Add event types and unsubscribed when needed.
  subscribe(callback) {
    this.subscribers.push(callback)
  }
  
}

export default new AlertService();
