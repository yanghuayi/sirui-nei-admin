this.props.form.validateFieldsAndScroll((err, values) => {
  if (!err) {
    addInterfaceRequest(values).then((data) => {
      this.setState({
        confirmLoading: true
      })  
      setTimeout(() => {
        if (!data.status) {
          Message.success(data.msg);
          AddBack(0); // 成功
        } else {
          Message.error(data.msg);
          AddBack(1); // 失败
        }
        this.setState({
          confirmLoading: false
        })
      }, 1600)
    }).catch((err) => {
      Message.error(err.message)
    })
  }
})