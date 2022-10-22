import { body, validationResult } from "express-validator";

let angle = 0;
let touched = -1;
export default function espController({ app }) {
  app.get("/echo/:word", async (req, res) => {
    res.send(req.params.word);
  });

  app.get("/angle", async (req, res) => {
    res.send(200, angle);
  });
  app.post("/angle", async (req, res) => {
    angle = req.body.angle;
    res.send(200);
  });

  app.get("/touched", async (req, res) => {
    res.send(200, touched);
  });
  app.post("/touched", async (req, res) => {
    touched = req.body.touched;
    res.send(200);
  });
  /* app.get("/dico-length", async (req, res) => {
     res.send(
       dico.words
         .reduce((acc, w) => {
           acc[w.length] += 1;
           return acc;
         }, new Array(32).fill(0))
         .map((e) => (e / dico.words.length) * 100)
     );
   });
 
   app.get("/dico", async (req, res) => {
     const words = await dico.getWords();
     res.send(words);
   });
 
   app.post("/word", [body("word").isString().notEmpty()], async (req, res) => {
     const word = req.body.word.trim();
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(500).json({ errors: errors.array() });
     }
     const exists = (await db.getWords()).find((w) => !w.localeCompare(word));
     if (exists) {
       return res.status(500).json({ errors: [{ msg: "exists already" }] });
     }
     try {
       await db.pushWord(word);
     } catch (e) {
       return res.status(500).send(e.message);
     }
     dico.addWordsToDictionnary([word]);
     res.sendStatus(200);
     res.send();
   });
   app.delete("/word/:word", async (req, res) => {
     const word = req.params.word.trim();
     await db.deleteWord(req.params.word);
     dico.removeWordsFromDictionary([word]);
     res.sendStatus(200);
   });*/
}
