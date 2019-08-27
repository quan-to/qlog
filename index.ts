/* Qlog 2.0 created by Nemo at 18:15 */

function setup() {
    // TODO get env variables
}

class Qlog {
    scopeStack: Array<string>
    fields: object
    
    constructor(scopeStack:Array<string>, fields:object) {
        this.scopeStack = scopeStack
        this.fields = fields
    }

    public addFields(fields:object){
        this.fields = { ...this.fields, ...fields }
        return this 
    }

    public subScope(scopeName:string){
        return new Qlog([...this.scopeStack, scopeName], this.fields)
    }

    public info(message){
        this.log('I', message)
    }

    public debug(message){
        this.log('D', message)
    }

    public warn(message){
        this.log('W', message)
    }
    
    public log(category,message) {
        //[timestamp,scopeStack,message,fields
        console.log(`[[${(new Date()).toISOString()}]|${category}|${this.scopeStack.join(' > ')}|${message}|${JSON.stringify(this.fields)}]`) 
    }
}

export { Qlog };