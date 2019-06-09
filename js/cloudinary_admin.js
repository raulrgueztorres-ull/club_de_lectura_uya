var CLOUDINARY_URL = '	https://api.cloudinary.com/v1_1/dtrk8j2x1/upload';
var CLOUDINARY_UPLOAD_PRESET = 'jloermju';

function profile_picture()
{
    var fileUpload = document.getElementById('file-upload-profile');
    fileUpload.addEventListener('change', function(event){
        var file = event.target.files[0];
        var formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);


        axios({
            url: CLOUDINARY_URL,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: formData
        }).then(function(res) {
            var imageURL = res.data.secure_url;
            var updates = {};
            updates['users/' + firebase.auth().currentUser.uid + '/user_image'] = imageURL;
            firebase.database().ref().update(updates);
            document.location.reload();
        }).catch(function(err) {
            console.log(err);
        });
    });

}
