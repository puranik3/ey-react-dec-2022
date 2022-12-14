export default interface ISession {
    "id": number,
    "workshopId": number,
    "sequenceId": number,
    "name": string,
    "speaker": string,
    "duration": number,
    "level": "Basic" | "Intermediate" | "Advanced",
    "abstract": string
    "upvoteCount": number
}