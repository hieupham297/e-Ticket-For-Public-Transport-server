// Xử lý thành công
const handleSuccess = (res, data, message) => {
    return res.send({
      code: 1,
      message: message,
      data: data,
    });
  };
  
  // Xử lý lỗi
  const handleError = (res, message, status) => {
    if (status) {
      res.status(status);
    }
    return res.send({
      code: 2,
      message: message,
    });
  };
  
  // Xử lý lỗi hệ thống
  const errorSystem = (res, err) => {
    res.status(500); 
    return res.send({
      code: 0,
      message: err.message,
    });
  };
  
  module.exports = {
    handleSuccess,
    handleError,
    errorSystem,
  };
  