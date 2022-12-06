fetch('/api/isadmin')
    .then(res => res.json())
    .then(data => {

        if (data.bool) {

        } else {

        }
    })
    .catch(err => console.log(err))
