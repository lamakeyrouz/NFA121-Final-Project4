var baseURL = "http://localhost:3000";
async function request(requestType, endPoint, body) {
  try {
    let response = await axios({
      method: requestType,
      url: `${baseURL}${endPoint}`,
      data: body,
      headers: {
        Authorization: `Bearer ${sharedHelpersInstance.getCookie("token")}`,
      },
    });

    if (response.status >= 200 && response.status <= 299) {
      if (response.data) {
        return response;
      }
      return requestResponse.success;
    }
    if (response.status == 401) {
      alert(strings.unauthorized);
      return requestResponse.unauthorized;
    }
    alert(strings.somethingWentWrong);
    return requestResponse.error;
  } catch (e) {
    if (e.response) {
      if (e.response.status == 401) {
        alert(strings.unauthorized);
        return requestResponse.unauthorized;
      }
      if (e.response.data) {
        alert(e.response.data.message);
      } else {
        if (e.message) {
          alert(e.message);
        } else {
          alert(strings.somethingWentWrong);
        }
      }
    } else if (e.message) {
      alert(e.message);
    } else {
      alert(strings.somethingWentWrong);
    }
    return requestResponse.error;
  }
}
