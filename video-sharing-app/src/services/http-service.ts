import { LoggingLevel } from "shared/enums/logging-level";
import { LoggingHelper } from "shared/helpers/logging-helper";

const { fetch: originalFetch } = window;
window.fetch = async (...args) => {
  let [resource, options] = args;

  LoggingHelper.writeLog(
    "http-service",
    "Request",
    `--> ${options?.method?.toUpperCase()} ${resource} (body: ${options?.body})`
  );
  const response = await originalFetch(resource, options);
  return response;
};

class HttpService {
  buildConfig(configCustom, method, data = null) {
    try {
      const headers = {
        "Content-Type": "application/json; charset=utf-8",
      };

      const config = {
        method: method || "get",
        headers: { ...headers, ...configCustom },
      };

      if (data) {
        config["body"] = JSON.stringify(data);
      }

      return config;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  reviseUrl(url: string) {
    try {
      // todo: add some logic to revise the url here if any
    } catch (error: any) {
      throw new Error(error);
    }
    return url;
  }

  async get(url: string, config: any = null) {
    try {
      const results = await fetch(
        this.reviseUrl(url),
        this.buildConfig(config, "get")
      );
      return await results.json();
    } catch (error) {
      return this.handleError(error);
    }
  }

  async post(url: string, data: any = null, config: any = null) {
    try {
      const results = await fetch(
        this.reviseUrl(url),
        this.buildConfig(config, "post", data)
      );
      return await results.json();
    } catch (error) {
      return this.handleError(error);
    }
  }

  async put(url: string, data: any = null, config: any = null) {
    try {
      const results = await fetch(
        this.reviseUrl(url),
        this.buildConfig(config, "put", data)
      );
      return await results.json();
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete(url: string, config: any = null) {
    try {
      const results = await fetch(
        this.reviseUrl(url),
        this.buildConfig(config, "delete")
      );
      return await results.json();
    } catch (error) {
      return this.handleError(error);
    }
  }

  handleError(error) {
    LoggingHelper.writeLog(
      "http-service",
      "handleError",
      `${error ? JSON.stringify(error) : ""}`,
      LoggingLevel.Error
    );

    if (!error) return Promise.reject("Unknown error");

    if (!error.ok) {
      throw Error(error.statusText);
    }

    return Promise.reject(error);
  }
}

export const httpService = new HttpService();
