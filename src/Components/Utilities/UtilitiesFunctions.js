import moment from 'moment';

export const articlePostTime = (postTime) => {

    const date = moment(postTime)

    const now = moment()

    const diffInHours = now.diff(date, 'hours')

    let formattedTime

    if(diffInHours < 24) {
        formattedTime = Math.floor(diffInHours) + ' hours ago'
    } else {
        formattedTime = Math.floor(diffInHours / 24) + ' days ago'
    }

    return formattedTime

}