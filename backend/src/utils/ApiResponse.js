class ApiResponse {
  constructor(statusCode, data = {}, message = "Everything good.") {
    this.success = true;
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}

export default ApiResponse;
