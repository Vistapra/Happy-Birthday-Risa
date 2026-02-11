import { AppConfig, ScreenName } from './types';

export const defaultAppConfig: AppConfig = {
    recipientName: "Risa",
    theme: {
        primaryColor: "#e91e63",
        secondaryColor: "#fce4ec",
        backgroundColor: "#ffffff",
        textColor: "#333333",
        fontFamily: "Inter, sans-serif",
        buttonStyle: "rounded-xl"
    },
    screens: {
        preloader: {
            backgroundColor: "#FFFAF5",
            loaderColor: "#e8b5b9",
            duration: 3500,
            icon: "/uploads/1770808003360-171853963.png",
            text: "RISA MAYASARI❤️",
            logoImage: "/uploads/1770808164883-754081334.png"
        },
        opening: {
            titleText: "Hallo Sayangku..",
            subtitleText: "Love you❤️",
            backgroundImage: "/uploads/1770628301636-844810223.jpg",
            buttonText: "BUKA SAYANG"
        },
        greeting: {
            heading: "RISA MAYASARI❤️",
            subTitle: "Happy Birthday",
            badgeText: "Today is a",
            message: "Special Calon Istriku Tercinta❤️",
            avatarImage: "/uploads/1770808286898-93834036.png",
            buttonText: "Buka Lagi Sayang"
        },
        message: {
            title: "Untuk Calon Istriku",
            paragraphs: [
                { id: "1", text: "Selamat Ulang Tahun Ya Calon Istriku...." },
                { id: "2", text: "Selamat ulang tahun, Risoll.\nDi hari spesialmu ini, aku cuma ingin kamu tahu satu hal dulu: aku benar-benar bersyukur karena Tuhan menghadirkan kamu di hidupku. Kamu bukan cuma seseorang yang aku cintai, tapi juga rumah, tempat aku pulang, dan alasan aku ingin jadi versi diriku yang lebih baik." },
                { id: "3", text: "Maafkan aku ya, sayang…\nMaaf kalau sampai hari ini aku belum bisa memberikan kebahagiaan yang pantas kamu dapatkan. Maaf kalau aku belum bisa jadi pasangan yang sempurna, belum bisa selalu ada seperti yang kamu harapkan, dan belum bisa membahagiakanmu sepenuhnya. Kadang aku sadar, cintaku besar, tapi kemampuanku masih terbatas." },
                { id: "4", text: "Maaf juga kalau di hari ulang tahunmu ini aku cuma bisa memberikan hadiah sederhana ini. Bukan karena kamu pantas menerima yang biasa, tapi karena aku masih berjuang untuk suatu hari nanti bisa memberimu lebih—lebih dari sekadar hadiah, tapi masa depan yang layak dan membahagiakan." },
                { id: "5", text: "Namun satu hal yang tidak pernah setengah-setengah adalah perasaanku ke kamu. Aku mencintaimu dengan tulus, dengan segala kekuranganku. Aku mungkin belum sempurna hari ini, tapi aku berjanji aku akan terus belajar, berusaha, dan berjuang—demi kamu, demi kita." },
                { id: "6", text: "Terima kasih sudah bertahan sejauh ini. Terima kasih sudah memilih aku, meskipun aku belum sepenuhnya jadi apa yang kamu impikan. Tolong tetaplah di sisiku, temani aku tumbuh, sampai suatu hari aku bisa benar-benar membuatmu tersenyum tanpa ragu." },
                { id: "7", text: "Selamat ulang tahun, sayang. Doaku sederhana: semoga kamu selalu sehat, bahagia, dan semoga aku masih diberi kesempatan untuk hidup bersamamu lebih lama lagi. Aku sayang kamu, Risol. Dengan seluruh hatiku❤️❤️❤️" }
            ],
            signature: "Dari Calon Suamimu❤️",
            buttonText: "Buka Lagi Sayangku"
        },
        memories: {
            title: "Kenangan Kita",
            subtitle: "Vista Pramudya & Risa Mayasari",
            buttonText: "BUKA SAYANG",
            memories: [
                { id: "1", title: "First Meet With You❤️", description: "Vista Pramudya & Risa Mayasari", date: "Sabtu, 7 Juni 2025", image: "/uploads/1770809202602-202941408.jpg", icon: "calendar_today" },
                { id: "2", title: "Second Meeting with You❤️", description: "Vista Pramudya & Risa Mayasari", date: "Sabtu, 28 Juni 2025", image: "/uploads/1770809419572-784227239.jpg", icon: "calendar_today" },
                { id: "3", title: "Third Meeting with You❤️", description: "Vista Pramudya & Risa Mayasari", date: "Senin, 4 Agustus 2025", image: "/uploads/1770809689315-170441129.jpg", icon: "calendar_today" },
                { id: "4", title: "Asking Your Parents for Permission to Be with You", description: "Vista Pramudya, Risa Mayasari & Akilla", date: "Selasa, 5 Agustus 2025", image: "/uploads/1770809772609-847987321.jpg", icon: "calendar_today" },
                { id: "5", title: "Going Out After Getting Our Parents’ Approval", description: "Vista Pramudya & Risa Mayasari", date: "Rabu, 6 Agustus 2025", image: "/uploads/1770809886838-361821971.jpg", icon: "calendar_today" },
                { id: "6", title: "Fourth Meeting with You", description: "Vista Pramudya & Risa Mayasari", date: "Senin, 15 September 2025", image: "/uploads/1770810082048-137574631.jpg", icon: "calendar_today" },
                { id: "7", title: "Going Out with My Sibling", description: "Vista Pramudya,Risa Mayasari, Nazila & Deo", date: "Selasa, 16 September 2025", image: "/uploads/1770810225473-998282015.jpg", icon: "calendar_today" },
                { id: "8", title: "Shopping for Matching Outfits Together", description: "Vista Pramudya & Risa Mayasari", date: "Kamis, 18 September 2025", image: "/uploads/1770810361830-301453658.jpg", icon: "calendar_today" },
                { id: "9", title: "Looking for an Engagement Ring for Us", description: "Risa Mayasari", date: "Minggu, 21 September 2025", image: "/uploads/1770811439755-530411400.jpg", icon: "calendar_today" },
                { id: "10", title: "The Day I Proposed to You", description: "My Family", date: "Minggu, 19 Oktober 2025", image: "/uploads/1770811449143-145570838.jpg", icon: " calendar_today" },
                { id: "11", title: "Going to Alun Alun Yogyakarta", description: "Family", date: "Selasa, 25 November 2025", image: "/uploads/1770811519370-479034167.jpg", icon: " calendar_today" },
                { id: "12", title: "Going to Malioboro", description: "Vista Pramudya & Risa Mayasari", date: "Kamis, 27 November 2025", image: "/uploads/1770811626571-366456867.jpg", icon: " calendar_today" },
                { id: "13", title: "A Day at the South Beach", description: "Vista Pramudya & Risa Mayasari", date: "Jum'at, 28 November 2025", image: "/uploads/1770811693360-743802619.jpg", icon: " calendar_today" },
                { id: "14", title: "A Trip to Tebing Breksi", description: "Vista Pramudya & Risa Mayasari", date: "Sabtu, 29 November 2025", image: "/uploads/1770811781991-733962577.jpg", icon: " calendar_today" },
                { id: "15", title: "A Visit to “Caffe Tenang”", description: "Vista Pramudya & Risa Mayasari", date: "Minggu, 30 November 2025", image: "/uploads/1770811869591-787723994.jpg", icon: " calendar_today" },
                { id: "16", title: "Going to the Waterpark with Family", description: "Family", date: "Jum'at 2 Januari 2026", image: "/uploads/1770811931829-800959319.jpg", icon: " calendar_today" },
                { id: "17", title: "Hanging Out at “Caffe Kabar Baik”", description: "Vista Pramudya & Risa Mayasari", date: "", image: "/uploads/1770812016228-653002934.jpg", icon: " calendar_today" },
                { id: "18", title: "Having a Meal Together at “Candhari Heaven”", description: "Vista Pramudya & Risa Mayasari", date: "Selasa, 20 januari 2026", image: "/uploads/1770812083596-620090241.jpg", icon: " calendar_today" },
                { id: "19", title: "Love You", description: "Vista Pramudya & Risa Mayasari", date: "", image: "/uploads/1770812356615-322422554.jpg", icon: "" },
                { id: "20", title: "Love You Risol", description: "Vista Pramudya & Risa Mayasari", date: "", image: "/uploads/1770812382161-824056282.jpg", icon: "" },
                { id: "21", title: "Risol Mayo", description: "Vista Pramudya & Risa Mayasari", date: "", image: "/uploads/1770812417573-540955667.jpg", icon: "" },
                { id: "22", title: "Vista Pramudya & Risa Mayasari", description: "Ricol Jelek", date: "", image: "/uploads/1770812462954-341704972.jpg", icon: "" },
                { id: "23", title: "WiuWiuWiu", description: "Vista Pramudya & Risa Mayasari", date: "", image: "/uploads/1770812512800-998596208.jpg", icon: "" },
                { id: "24", title: "KiuuKiuuKiuuKiuuu", description: "Vista Pramudya & Risa Mayasari", date: "", image: "/uploads/1770812550584-618071820.jpg", icon: "" }
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
            boxText: "Sabar  Sayang......",
            hintText: "Yeayy Sayangkuu Cintakuu Calon Istrikuu, Selamat Ulang Tahunn❤️❤️🎉🎉🎉",
            skipText: "LOVE YOU",
            boxImage: "/uploads/1770813696311-143319520.png"
        },
        giftReveal: {
            revealTitle: "Dari Calon",
            revealMessage: "Untuk Calon Istriku Risa Sayang❤️❤️",
            buttonText: "SURPRISE SAYANG",
            giftImage: "/uploads/1770814063127-335762970.png"
        },
        closing: {
            closingMessage: "VISTA & RISA",
            subtitle: "SELAMAT HARI ULANG TAHUN CALON ISTRIKU TERCINTA",
            signature: "",
            buttonText: "TERAKHIR CINTAKU",
            backgroundImage: "/uploads/1770814469534-107371022.jpg"
        }
    },
    musicUrl: "/uploads/1770815353579-591801774.mp3"
};
