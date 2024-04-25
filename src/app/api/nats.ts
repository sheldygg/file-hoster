import {connect, NatsConnection, ObjectStore, StorageType} from 'nats.ws';

let natsConnection: NatsConnection | null = null;
let objectStore: ObjectStore | null = null;

export const getNatsConnection = async () => {
    if (!natsConnection) {
        const servers = process.env.NEXT_PUBLIC_NATS_SERVERS
        const user = process.env.NEXT_PUBLIC_NATS_USER
        const password = process.env.NEXT_PUBLIC_NATS_PASSWORD
        natsConnection = await connect(
            {
                servers: servers,
                user: user,
                pass: password,
            }
        );
    }
    return natsConnection;
};

export const getObjectStorage = async () => {
    if (!objectStore) {
        const nc = await getNatsConnection();
        console.log(nc.getServer())
        objectStore = await nc.jetstream().views.os(
            "files_bucket",
            {
                storage: StorageType.File,
                ttl: 86400 * 10 ** 9 // 7 days
            }
        );
    }
    return objectStore;
};
