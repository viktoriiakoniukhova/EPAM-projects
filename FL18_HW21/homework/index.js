class MagazineStatus {
    constructor(status) {
        this.Status = status;
    }

    next() {
        return new this.Status();
    }
}

class ReadyForPushNotification extends MagazineStatus {
    constructor() {
        super(ReadyForApprove);
    }

    publish(name) {
        console.log(`Hello ${name}. You can't publish. We are creating publications now.`);
    }

    approve(name, department) {
        const ENOUGH = 5;
        const articlesLength = Object.keys(this.articles).length;

        if (department !== 'manager') {
            console.log('you do not have permissions to do it');
        } else if (articlesLength < ENOUGH && department === 'manager') {
            console.log(`Hello ${name}. You can't approve. We don't have enough of publications`);
        } else {
            this.nextState();
            this.state.approve.call(this, name);
        }
    }
}

class ReadyForApprove extends MagazineStatus {
    constructor() {
        super(ReadyForPublish);
    }

    publish(name) {
        console.log(`Hello ${name}. You can't publish. We don't have a manager's approval.`);
    }

    approve(name) {
        console.log(`Hello ${name}. You've approved the changes`);
        this.nextState();
    }
}

class ReadyForPublish extends MagazineStatus {
    constructor() {
        super(PublishInProgress);
    }

    publish(name) {
        console.log(`Hello ${name}. You've recently published publications.`);
        this.nextState();
        this.state.approve.call(this, name);
    }

    approve(name, department) {
        if (department === 'manager') {
            console.log(`Hello ${name}. Publications have been already approved by you.`);
        } else {
            console.log('you do not have permissions to do it');
        }
    }
}

class PublishInProgress extends MagazineStatus {
    constructor() {
        super(ReadyForPushNotification);
    }

    publish(name) {
        console.log(`Hello ${name}. While we are publishing we can't do any actions.`);
    }

    approve(name) {
        if (!this.noAction) {
            // post all articles to users
            if (this.articles) {
                const topicPosts = {};
                const topics = [];

                // sort all articles by topics
                for (let [article, followers] of Object.entries(this.articles)) {
                    followers.forEach((follower) => {
                        if (topicPosts[follower.topic]) {
                            topicPosts[follower.topic].push(`${article} ${follower.name}`);
                        } else {
                            topicPosts[follower.topic] = [`${article} ${follower.name}`];
                        }

                        if (!topics.includes(follower.topic)) {
                            topics.push(follower.topic);
                        }
                    });
                }

                // output notification for followers by topics in order of addition
                for (let topic of topics) {
                    topicPosts[topic].forEach((post) => {
                        console.log(post);
                    });
                }

                this.articles = []; // clear all previous articles
            }

            // block all actions on 60 seconds
            const NOACTIONTIME = 60000;
            this.noAction = true;

            setTimeout(() => {
                delete this.noAction; // remove blocking actions
                this.nextState();
            }, NOACTIONTIME);
        } else {
            console.log(`Hello ${name}. While we are publishing we can't do any actions`);
        }
    }
}

class Magazine {
    constructor() {
        this.staff = []; // list of staff
        this.articles = {}; // list(object) of articles for followers,
        this.followers = []; // list of followers
        this.state = new ReadyForPushNotification();
    }

    nextState() {
        this.state = this.state.next();
    }
}

class MagazineEmployee {
    constructor(name, department, magazine) {
        this.name = name;
        this.department = department;
        this.magazine = magazine;

        magazine.staff.push(this);
    }

    addArticle(article) {
        const followers = this.magazine.followers;

        followers.forEach((follower) => {
            if (follower.topic === this.department) {
                if (Object.keys(magazine.articles).includes(article)) {
                    this.magazine.articles[article].push(follower); // Updated this.magazine(Prev: magazine.)!
                } else {
                    this.magazine.articles[article] = [follower]; // Updated this.magazine(Prev: magazine.)!
                }
            }
        });
    }

    approve() {
        this.magazine.state.approve.call(this.magazine, this.name, this.department);
    }

    publish() {
        this.magazine.state.publish.call(this.magazine, this.name, this.department);
    }
}

class Follower {
    constructor(name) {
        this.name = name;
    }

    subscribeTo(magazine, topic) {
        if (this.topic) {
            this.topic = [...this.topic, topic];
        } else {
            this.topic = topic;
        }

        magazine.followers.push({
            ...this,
            topic
        });
    }

    unsubscribeFrom(magazine, topic) {
        magazine.followers = magazine.followers.filter((follower) => {
            return !(follower.name === this.name && follower.topic === topic);
        });
    }
}

const magazine = new Magazine();
const manager = new MagazineEmployee('Andrii', 'manager', magazine);
const sport = new MagazineEmployee('Serhii', 'sport', magazine);
const politics = new MagazineEmployee('Volodymyr', 'politics', magazine);
const general = new MagazineEmployee('Olha', 'general', magazine);

const iryna = new Follower('Iryna');
const maksym = new Follower('Maksym');
const mariya = new Follower('Mariya');

iryna.subscribeTo(magazine, 'sport');
maksym.subscribeTo(magazine, 'politics');
mariya.subscribeTo(magazine, 'politics');
mariya.subscribeTo(magazine, 'general');

sport.addArticle('something about sport');
politics.addArticle('something about politics');
general.addArticle('some general information');
politics.addArticle('something about politics again');

sport.approve(); //you do not have permissions to do it
manager.approve(); //Hello Andrii. You can't approve. We don't have enough of publications
politics.publish(); //Hello Volodymyr. You can't publish. We are creating publications now.
sport.addArticle('news about sport');
manager.approve(); //Hello Andrii. You've approved the changes
sport.publish(); //Hello Serhii. You've recently published publications.

/*
something about sport Iryna
news about sport Iryna
something about politics Maksym
something about politics Mariya
something about politics again Maksym
something about politics again Mariya
some general information Mariya
*/

manager.approve('news about sport'); //Hello Andrii. While we are publishing we can't do any actions

mariya.unsubscribeFrom(magazine, 'general');
