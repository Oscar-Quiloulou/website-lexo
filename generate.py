import os

structure = {
    "public": {
        "assets": {
            "img": {},
            "icons": {},
            "ads": {}
        },
        "ads.txt": "",
        "manifest.json": ""
    },
    "src": {
        "core": {
            "auth.js": "",
            "user.js": "",
            "vip.js": "",
            "ads.js": "",
            "api.js": "",
            "chapters.js": "",
            "utils.js": ""
        },
        "components": {
            "navbar.js": "",
            "footer.js": "",
            "adBanner.js": "",
            "exerciseGenerator.js": "",
            "chapterSelector.js": ""
        },
        "pages": {
            "index.html": "",
            "traduction.html": "",
            "chatgpt.html": "",
            "exercices": {
                "index.html": "",
                "6e.html": "",
                "5e.html": "",
                "4e.html": "",
                "3e.html": "",
                "6e": {
                    "maths.html": "",
                    "francais.html": "",
                    "histoire.html": "",
                    "geo.html": "",
                    "svt.html": "",
                    "techno.html": ""
                },
                "5e": {
                    "maths.html": "",
                    "francais.html": "",
                    "histoire.html": "",
                    "geo.html": "",
                    "svt.html": "",
                    "techno.html": ""
                },
                "4e": {
                    "maths.html": "",
                    "francais.html": "",
                    "histoire.html": "",
                    "geo.html": "",
                    "svt.html": "",
                    "techno.html": ""
                },
                "3e": {
                    "maths.html": "",
                    "francais.html": "",
                    "histoire.html": "",
                    "geo.html": "",
                    "svt.html": "",
                    "techno.html": ""
                }
            },
            "account": {
                "login.html": "",
                "register.html": "",
                "profile.html": "",
                "vip.html": ""
            },
            "ads": {
                "boost.html": "",
                "remove.html": ""
            }
        },
        "styles": {
            "global.css": "",
            "theme.css": "",
            "ads.css": "",
            "exercises.css": ""
        },
        "data": {
            "chapters.json": "",
            "subjects.json": ""
        }
    },
    "vercel.json": "",
    "README.md": ""
}


def create_structure(base_path, tree):
    for name, content in tree.items():
        path = os.path.join(base_path, name)

        if isinstance(content, dict):
            os.makedirs(path, exist_ok=True)
            create_structure(path, content)
        else:
            os.makedirs(base_path, exist_ok=True)
            with open(path, "w", encoding="utf-8") as f:
                f.write(content)


if __name__ == "__main__":
    create_structure(".", structure)
    print("Arborescence générée avec succès !")
