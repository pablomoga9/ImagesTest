const queries = {
    "createUser":"INSERT INTO users (email,password,description,name,picture) VALUES ($1,$2,$3,$4,$5)",
    "getUserByEmail":"SELECT * FROM users WHERE email=$1",
    "updateUser":"UPDATE users SET name=$1,description=$2,picture=$3 WHERE id=$4",
    "getImages":"SELECT * FROM images WHERE user_id=$1",
    "getAllImages":"SELECT * FROM images",
    "createImage":"INSERT INTO images (url,description,user_id,date_created,title) VALUES ($1,$2,$3,$4,$5)",
    "deleteImage":"DELETE * FROM images WHERE id=$1",
    "updateImage":"UPDATE images SET url=$1,description=$2 WHERE id=$3"
}

module.exports = queries;