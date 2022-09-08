// Multer est un package qui nous permet de gérer les fichiers entrants dans les requêtes HTTP.
// Ici, ce sera les images téléchargées par les users .
// On va traduire les types de fichier pour générer des extensions possibles.
// On enregistre les images téléchargées par le user dans le disk.
// La configuration de multer nécessite deux arguments : destination + filename prenant prenant 3 paramètres chacun.
// Le callback renvoie vers la destination d'enregistrement qui est le dossier images.
// Le nom de fichier a considérer :
// on va créer le nom du fichier (prend le nom d'origine, le split), et on remplace les espaces par des undescores.
// on génère l'extension du fichier et on le renvoie en callback avec le nom du fichier final.

const multer = require('multer');
const fs = require('fs'); 

const MIME_TYPES = { 
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
};

const storage = multer.diskStorage({ 
    destination: (req, file, callback) => { 
        if (!fs.existsSync('avatars')) { 
            fs.mkdirSync('avatars'); 
            callback(null, 'avatars');
        } else { 
        callback(null, 'avatars');
        }
    },
    filename: (req, file, callback) => { 
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype]; 
        callback(null, name + Date.now() + '.' + extension);  
    }
});

// Exportation du  multer en appelant le module storage.

module.exports = multer({ storage }).single('avatar');