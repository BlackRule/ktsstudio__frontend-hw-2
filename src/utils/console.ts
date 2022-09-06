export function log(...t:any[]){
    console.log(...t) //fixme теряется callStack поэтому не замена console.log'у :(
}