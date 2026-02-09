import { AppConfig, ScreenName } from '../types';

export const defaultAppConfig: AppConfig = {
    recipientName: "Risa",
    theme: {
        primaryColor: "#e8b5b9",
        secondaryColor: "#d68c93",
        backgroundColor: "#FFFAF5",
        textColor: "#171213",
        fontFamily: "Plus Jakarta Sans, sans-serif",
        buttonStyle: "rounded-xl"
    },
    screens: {
        preloader: {
            backgroundColor: "#FFFAF5",
            loaderColor: "#e8b5b9",
            duration: 3500
        },
        opening: {
            titleText: "Hello Risa…",
            subtitleText: "Tap to open",
            backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiuJENYu-s-du0KPcI6zNXegL2ptlcfG-ZNbRuD5nFtH0OkUcbNArt1h13XNGqAIghq_K39qZctW28nb1UrPIkfT9DK9gHQzI-zvl7cYW1iKYx3iFLmp1bB6lMKxVpkMTTjUQ-vEeq1oVKNeAbuYaGbMIw6Wc4htqq676zZFnH8Bm0axCCx9sJXzmibhBwv3p4Ty56YdD6Z5UDxHIjhNzx4KF_jcc9MmirZE-zPRu1aHtHKZJjVfYl5Z5ypbzQ35pLnRt8ZI02ZaA",
            buttonText: "Open"
        },
        greeting: {
            heading: "Risa\nMayasari",
            subTitle: "Happy Birthday",
            badgeText: "Today is Special",
            wish: "Wishing you a day as beautiful and radiant as you are.",
            message: "Wishing you a day as beautiful and radiant as you are.", // Mapped from 'wish'
            avatarImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkrJgvj-pjko6MINVktsg4J6d4Bmb879W_TuqXRv4xjMpKrnvPk9C4CnPRhEGrMdLe5CXB1yhfpDygH4AqaIIiQdKNso7BkU5Hxzkffp4QsfTkiZ8Wa4_fEMeukRKoED99WKzh-Iwy26OJkhkbfUznJgSNHKvhPbhfq-8AKqIlvljTPcZ2PwFQnNOIS5BSnEoCZ2erCLHzeco9mEzgR3ULMz95q1jTKa2YN8L-Wim7JkIccmrn9p3qt0VO42AvsiGAhnjXKNRBiTg",
            buttonText: "Open Tribute"
        },
        message: {
            title: "A Special Message",
            paragraphs: [
                { id: "1", text: "Happy Birthday, Risa!" },
                { id: "2", text: "May your day be filled with the same joy and light you bring into our lives. You are a treasure to us all, and we hope this year brings you as much happiness as you give to everyone around you." },
                { id: "3", text: "Keep shining bright and never forget how loved you are. Here's to another year of beautiful memories and endless laughter." }
            ],
            signature: "With all our love",
            buttonText: "Next Memory"
        },
        memories: {
            title: "Beautiful Memories",
            subtitle: "Celebrating Risa Mayasari",
            buttonText: "Play Slideshow",
            memories: [
                {
                    id: "1",
                    title: "25th Birthday Party",
                    description: "A wonderful night with friends and family.",
                    date: "Oct 12, 2023",
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtjX2z2F9sy1bSoBcK2XJcwf9eZfMi1ape9b7GZLnwMv1NCFBbCgPPKQN5j20om_UIIALMuNyIxbUpBOON30S-poJjxAeJp3K4Pavvg8nxS612hXD-xM21YLM2d4_gd9nV9mBsuf9A8KjbaE0m-4o1-4viAOzJz3WTA4hnJIVaLC5GO5c7QmjIGOsnotQEwPklzn594Si3Xc-wreUm7Hgj_3IBtCA85nSHHgjf8SHdzrqgL3G4t2GC-S-xUfty8UjKe5VEmyoM790",
                    icon: "calendar_today"
                },
                {
                    id: "2",
                    title: "Trip to Bali",
                    description: "Unforgettable summer vacation.",
                    date: "Summer 2022",
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUXQ6gjogExARoXsfwVLfawE79UEeMvDpCKHKRGZHx8BU2fLqn4bQXj6tqANXKAYA_itjhKKEWGiRYLUpUGtvFT_o9MmrEq1BCRuAccDs2ps4dDfpY3xKvUqBrL5LZq6tJ954v-Ql0CLfiaqysBuD0c7EMv6-GvXnzj6IdpI9V-YlMZbcVkYbpPwfltuFWRWsPYD-GilA8zXBn8RJYXoyR09xh27jWeO8tdC0IOU0fh-ELiv7ig04nWSArlEshO3fDUXDDRPeDtK4",
                    icon: "location_on"
                },
                {
                    id: "3",
                    title: "Always Smiling",
                    description: "Captured at the perfect moment.",
                    date: "Candid Moments",
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBx6SUh4Vc5Q_SFmXFWOH_MaVu-GuBlC-WD-zyTCw-klDRrwKd-85M07tUFcEzjtQ-XDEXCTV6gXkBZtvaREUaTD-aFzvZJRcYuSeeW-iYpbXOsNX4vt9BaQkCvRvT-HwcsUHh9SMvddxCL3iFRLD44mQXX1VSiNbwNkYrZHClfTv1bTS8-L05RCn7PQSaGybSFNQVPkxZ1_JugSNfGEnN01xmkGFvTQemJ55vz_FHMqhE5iHMjibavlSWksVqGqGjXXJrKqJsyGe4",
                    icon: "photo_camera"
                }
            ]
        },
        highlight: {
            title: "A Moment to\nRemember",
            location: "Cinque Terre, 2023",
            caption: "Celebrating 25 Years of Joy",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxKagJTx8nt4UL1JPZYKPWLh0tnVOKh9JJ4b_DfFSXUtgFsulIZgP5MopvT2weQqYYFOhJFWx9k3RiuuJuVD_r-R_0qkwP42awspVrpbWxN4s1HdSAOt8qD5EzTQvtVRUBNWa1cFYVdmMn-0ZYzLD1kCxIeS5VeScqmO1l6BXXqjcLxvCCuImym74Uhq0-yy5R9OeGN1MLmx3F-5C3H0JpYy5o4_lwJi8ThuwnshCBbNfgih20iZWRrwCa81-R66ObkvNaGcMy4Ts",
            highlights: [
                {
                    id: "1",
                    title: "Cinque Terre",
                    icon: "location_on",
                    color: "#D4AF37",
                    description: "A beautiful trip to Italy."
                }
            ]
        },
        giftBox: {
            boxText: "A Surprise awaits...",
            hintText: "We've collected memories and wishes just for your special day.",
            skipText: "Skip",
            boxImage: "https://cdn-icons-png.flaticon.com/512/4213/4213653.png" // Placeholder or finding a better one
        },
        giftReveal: {
            revealTitle: "Made with",
            revealMessage: "For Risa's Special Day",
            buttonText: "Open Tribute",
            giftImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxGfC1VrOtfavyosi8wJLFdt8Oh1oA4qlHALa9mVdzGX9ie_IBOu93SUxjADJhJVsR5IRu76NAgPQKFstL-ao09uhS61lid53Og56RCPCDfb45jm8iOfbyOoTKNNTE0Ww7EICOYZch_Vu14BP6XObAx_V8y_nOpgCcX4pCNRPFQ8bKBUcnawD6vc4djdRKbyQp78cWYKOJKoZmf_1og-H2NG9PFJG_bNwDaN8zvdgCzTmMdNLVxt-MGBqnyN6Ktw1Hz0iIlKCJibs"
        },
        closing: {
            closingMessage: "With Love ❤️",
            subtitle: "Hope This Day Is As Beautiful As You",
            signature: "– From your loved ones –",
            buttonText: "Replay Tribute",
            backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDG8aI_HwdHT1NP-8sbB2VPnUqUXqDbWTgTBTSayO-y2QFjwQS90dfz9DyMe0879ZkfamNTzxOasIaJDY5Usjqqq_iQvt1reSfZKGrk0KfsdqMD2N0hT0Pd6FfB1omsExxDs0QIikjT5yFUI4ziS2-2ubrsNRKnxXPA659WqFysJYHln0z9MbcrZR0icdox6A5EN1zoAUqpr9PhWyJzrtNw7J2LpvKHBqOfS9-XRV3W3gbLxhgpzX-wdUlVBparlwU_kukSA_eAhCE"
        }
    }
};
