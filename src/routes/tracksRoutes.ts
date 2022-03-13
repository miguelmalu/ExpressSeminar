import {Request, response, Response, Router} from 'express';

import Track from '../models/Track';

class TrackRoutes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes(); //This has to be written here so that the method can actually be configured when called externally.
    }

    public async getTracks(req: Request, res: Response) : Promise<void> { //It returns a void, but internally it's a promise.
        const allTracks = await Track.find();
        if (allTracks.length == 0){
            res.status(404).send("There are no tracks yet!")
        }
        else{
            res.status(200).send(allTracks);
        }
    }

    public async getTrackByTitle(req: Request, res: Response) : Promise<void> {
        const trackFound = await Track.findOne({title: req.params.titleTrack});
        if(trackFound == null){
            res.status(404).send("The track doesn't exist!");
        }
        else{
            res.status(200).send(trackFound);
        }
    }

    public async addTrack(req: Request, res: Response) : Promise<void> {
        console.log(req.body);
        const {id, title, author, year} = req.body;
        const newTrack = new Track({id, title, author, year});
        await newTrack.save();
        res.status(200).send('Track added!');
    }

    public async updateTrack(req: Request, res: Response) : Promise<void> {
        const trackToUpdate = await Track.findOneAndUpdate ({title: req.params.titleTrack}, req.body);
        if(trackToUpdate == null){
            res.status(404).send("The track doesn't exist!");
        }
        else{
            res.status(200).send('Updated!');
        }
    }

    public async deleteTrack(req: Request, res: Response) : Promise<void> {
        const trackToDelete = await Track.findOneAndDelete ({title:req.params.titleTrack}, req.body);
        if (trackToDelete == null){
            res.status(404).send("The track doesn't exist!")
        }
        else{
            res.status(200).send('Deleted!');
        }
    } 
    routes() {
        this.router.get('/', this.getTracks);
        this.router.get('/:titleTrack', this.getTrackByTitle);
        this.router.post('/', this.addTrack);
        this.router.put('/:titleTrack', this.updateTrack);
        this.router.delete('/:titleTrack', this.deleteTrack);
    }
}
const trackRoutes = new TrackRoutes();

export default trackRoutes.router;