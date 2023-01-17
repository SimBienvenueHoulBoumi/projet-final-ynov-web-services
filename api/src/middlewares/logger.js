module.exports = (req, res, next) => { // next() sert à passer le relai au middleware suivant
    try {
        // console.log(res)
        // console.log('+++++++++++ niveau 1')
        // console.log(res)  // recupérer les information du body
        // console.log('+++++++++++ niveau 2')
        next();
    } catch {
        res.status(501).json({message: 'Erreur au niveau du middleware : logger'})
    }
};