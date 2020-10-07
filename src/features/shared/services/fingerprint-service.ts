import { FP } from "@fp-pro/client"


//singleton pattern to only hit the Fingerprint service once....
export class FingerprintService {
    private fingerprint:string='';
    private static instance: FingerprintService;

    constructor(fingerprint:string){
        this.fingerprint = fingerprint;        
    }

    private static async init(): Promise<FingerprintService> {
        if(process.env.REACT_APP_FINGERPRINT_BROWSERTOKEN != undefined) {
            let fp = await FP.load({client: process.env.REACT_APP_FINGERPRINT_BROWSERTOKEN, region: "us"});
            let value = (await fp.send()).visitorId;
            this.instance = new FingerprintService(value);
        }
        return this.instance;
    }

    public getFingerPrint():string {
        return this.fingerprint;
    }

    public static async getInstance(): Promise<FingerprintService> {
        if(this.instance === undefined) {
            await this.init();
        }
        return this.instance;
    }
};

export default FingerprintService;
