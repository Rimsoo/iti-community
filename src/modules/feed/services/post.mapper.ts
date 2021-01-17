import { MessageAudioElement, MessageElement, MessageImageElement, MessageTextElement, MessageVideoElement, MessageYoutubeElement, Post, PostData, PostMessage } from '../post.model';

export class PostMapper {
  map(data: PostData): Post {
    return {
      ...data,
      message: this.parseMessage(data.message)
    }
  }

  private parseMessage(message: string): PostMessage {
    // rajouter png jpg et gif
    const pictureRegex = /http[s]?:\/\/\S+\.(jpeg|jpg|png|gif)/gmi;

     // mp4,wmv,flv,avi,wav
    const videoRegex = /http[s]?:\/\/\S+\.(mp4|wmv|flv|wav|avi)/gmi;

     // mp3,ogg,wav
    const audioRegex = /http[s]?:\/\/\S+\.(mp3|ogg|wav)/gmi;

    const youtubeRegex = /(http[s]?:\/\/)?(?:www\.youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\/?\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/gmi;
    const attachements: MessageElement[] = [];

    let pictureMatche = null;
    while (pictureMatche = pictureRegex.exec(message)) {
      const img : MessageImageElement = {
        type: 'image',
        url: pictureMatche[0]
      } ;
      attachements.push(img);
    }

    let videoMatche =null;
    while (videoMatche = videoRegex.exec(message)) {
     //  ajouter un attachement de type video dans attachements
     const vid : MessageVideoElement = {
      type: 'video',
      url: videoMatche[0]
    } ;
    attachements.push(vid);
    }

    let audioMatche = null;
    while (audioMatche = audioRegex.exec(message)) {
     //  ajouter un attachement de type audio dans attachements
     const aud : MessageAudioElement = {
      type: 'audio',
      url: audioMatche[0]
    } ;
    attachements.push(aud);
    }

    let youtubeMatche = null;
    while (youtubeMatche= youtubeRegex.exec(message)) {
     //  ajouter un attachement de type youtube dans attachements
     const yt : MessageYoutubeElement = {
      type: 'youtube',
      videoId: youtubeMatche[2]
    } ;
    attachements.push(yt);
    }

    return {
      text: {
        type: 'text',
        content: message
      } as MessageTextElement,
      attachements
    };
  }
}
