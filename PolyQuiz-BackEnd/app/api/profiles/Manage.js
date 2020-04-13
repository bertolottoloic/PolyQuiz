const { StatMemory } = require("../../models")
const { StatMoteur } = require("../../models")
const { StatVue } = require("../../models")


const addStat = (id, trouble) => {
    statTrouble = []
    try{
        switch(trouble){
            case "memory":
                statTrouble = StatMemory.get();
                break;
            case "moteur":
                statTrouble = StatMoteur.get();
                break;    
            case "vue":
                statTrouble = StatVue.get();
                break;
            default:
                break;
        }
    } catch(err) {
        res.status(500).json(err);
    }
    return statTrouble.filter((stat) => stat.profileId === id);
}

module.exports = {
    addStat
}