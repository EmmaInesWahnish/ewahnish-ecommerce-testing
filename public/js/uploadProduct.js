const uploadFile = (thefile) => {
    const uploadRoute = `/api/up`;

    let formData = new FormData();

    formData.append("avatar",thefile)

    console.log(thefile)

    const requestOptions = {
        method: 'POST',
        body: formData,
        headers: {
        }        
    }

    fetch(uploadRoute, requestOptions)
        .then(async res => {
          const data = await res.json();
          console.log(data)
        })
        .catch((err) => ("Error occured", err));
}

export default uploadFile