/** 
 * Vérification de l'**INCOMPATIBILITE** de l'objet en tant qu'id. 
 * * Renvoie **true** si l'objet rempli une de ces conditions :
 *   * n'est pas convertible en nombre
 *   * n'est pas un entier
 *   * est un booleen
 */
function faillingId(id){
    return Number.isNaN(Number(id)) ||  id % 1 !== 0 || typeof id === typeof Boolean()
}


/** 
 * Vérification de l'**INCOMPATIBILITE** de l'objet en tant que string. 
 * * Renvoie **true** si l'objet rempli une de ces conditions :
 *   * est undefined
 *   * n'est pas de type string
 */
function faillingString(message = undefined){
    return message === undefined  || typeof message != typeof String()
}

/** 
 * Vérification de l'**INCOMPATIBILITE** de l'objet en tant que boolean. 
 * * Renvoie **true** si l'objet rempli une de ces conditions :
 *   * est undefined
 *   * n'est pas de type Boolean
 */
function faillingBool(done = undefined){
    return done === undefined || typeof done != typeof Boolean()
}

module.exports = {
    faillingId,
    faillingString,
    faillingBool
}