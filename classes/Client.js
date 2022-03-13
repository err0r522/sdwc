const nfetch = require("node-fetch");

class Client {
    constructor (
        auth = { id: '', token: '', url: '',  }
    ){
        let {id, token, url} = auth;
        if(auth.id && typeof(id) == "string" && token && typeof(token) == "string") url = `https://discord.com/api/webhooks/${id}/${token}`;
        else if(!url) 
        throw new Error("No authenfication data was specified.");

        this.f = this.fetch = async () => {
            let data = await (await nfetch(url)).json();

            if(data.type != 1) 
            throw new Error("Only incoming webhooks are supported.");

            this.id = data.id;
            this.name = data.name || undefined;
            this.avatar = data.avatar || undefined;
            this.channel_id = data.channel_id || undefined;
            this.guild_id = data.guild_id || undefined;
            this.application_id = data.guild_id || undefined;

            return data;

        }

        this.e = this.execute = async (data = {
            content: '',
            username: '',
            avatar_url: '',
            tts: false,
            embeds: [],
            allowed_mentions: {},
            attachments: []
        }, wait = false, mfd = false, mfd_headers, thread_id = '') => {

            if(!data || typeof(data) != "object")
            throw new Error("Data must be an object")
            let f = await nfetch(url+((wait || thread_id ? "?": "")+(wait ? "wait=true": "")+(wait && thread_id ? "&": "")+(thread_id ? `thread_id=${thread_id}` : "")), {
                method: 'post',
                body: mfd ? data : JSON.stringify(data),
                headers: mfd ? mfd_headers : {'Content-Type': 'application/json'}
            }), r;

            if(f.status !== 200) 
            throw Error(await f.text())
            
            if(wait) r = await f.json();
            return r;
        };

        }

    };


module.exports = Client;
