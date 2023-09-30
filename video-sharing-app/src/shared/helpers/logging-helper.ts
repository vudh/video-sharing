import { LoggingLevel } from "shared/enums/logging-level";

class LoggingHelper {
  private static instance: LoggingHelper;
  debugLog: any;

  static getInstance(): LoggingHelper {
    if (!LoggingHelper.instance) {
      LoggingHelper.instance = new LoggingHelper();
    }

    return LoggingHelper.instance;
  }

  writeLog(
    className: string,
    method: string,
    message: string,
    level = LoggingLevel.Info
  ) {
    const log = `${this.dateAndTime()} [${level}][${this.detectBrowser()}] [${className}]-[${method}]: ${message}`;

    if (typeof window["DEBUG"] !== "undefined" && window["DEBUG"] === true)
      console.log(log);

    if (this.debugLog == null) this.debugLog = [];
    if (this.debugLog.length > 100000) this.debugLog.shift();
    this.debugLog.push(log);
  }

  detectBrowser() {
    if (
      (navigator.userAgent.indexOf("Opera") ||
        navigator.userAgent.indexOf("OPR")) !== -1
    ) {
      return "Opera";
    } else if (navigator.userAgent.indexOf("Chrome") !== -1) {
      return "Chrome";
    } else if (navigator.userAgent.indexOf("Safari") !== -1) {
      return "Safari";
    } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
      return "Firefox";
    } else if (navigator.userAgent.indexOf("MSIE") !== -1) {
      return "IE";
    } else {
      return "Unknown";
    }
  }

  dateAndTime() {
    const date = new Date();
    //zero-pad a single zero if needed
    const zp = (val: any) => {
      return val <= 9 ? `0${val}` : "" + val;
    };

    //zero-pad up to two zeroes if needed
    const zp2 = (val: any) => {
      return val <= 99 ? (val <= 9 ? `00${val}` : `0${val}`) : "" + val;
    };

    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();
    const h = date.getHours();
    const min = date.getMinutes();
    const s = date.getSeconds();
    const ms = date.getMilliseconds();
    return `${y}-${zp(m)}-${zp(d)} ${zp(h)}:${zp(min)}:${zp(s)}.${zp2(ms)}`;
  }

  getDebugLog() {
    return this.debugLog;
  }

  resetDebugLog() {
    this.debugLog = [];
  }
}

const loggingHelper = LoggingHelper.getInstance();
export { loggingHelper as LoggingHelper };
