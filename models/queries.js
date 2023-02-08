const queries = {
    "createUser":"INSERT INTO users (email,password,description,name,picture) VALUES ($1,$2,$3,$4,$5)",
    "getUserByEmail":"SELECT * FROM users WHERE email=$1",
    "updateUser":"UPDATE users SET name=$1,description=$2,picture=$3 WHERE id=$4",
    "getImages":"SELECT * FROM images WHERE user_id=$1",
    "createImage":"INSERT INTO images (url,description,id_user,date) VALUES ($1,$2,$3,$4)",
    "deleteImage":"DELETE * FROM images WHERE id=$1",
    "updateImage":"UPDATE images SET url=$1,description=$2 WHERE id=$3"
}

module.exports = queries;