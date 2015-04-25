/**
 * Class REST
 */
var rest = require('app/config/rest')();

/**
 * Class apiAdminPreloadController
 * @extends REST class
 * @property {String} model name of the MoongooseJS model
 * @property {Array} auth authorization of methods (index, list, etc...)
 * @property {Object} req ExpressJS request object (req)
 * @property {Object} res ExpressJS response object (res)
 */
function apiAdminPreloadController() {
    //this.auth = ['get', 'post', 'put', 'delete'];
    this.auth = [];
    this.model = 'profile';
//    this.aryUsers = [
//        {"google_id": 100, "google_token": "MFL23QSK9TH", "google_name": "Drake Cooke", "google_first_name": "Owen", "google_last_name": "Mejia", "google_hd": "Ridiculus Mus Corporation", "google_email": "sagittis.augue.eu@nec.net"},
//        {"google_id": 101, "google_token": "COM01TRU7ZR", "google_name": "Henry Arnold", "google_first_name": "Caesar", "google_last_name": "Ruiz", "google_hd": "Sed Congue Elit Limited", "google_email": "leo@bibendumfermentummetus.co.uk"},
//        {"google_id": 102, "google_token": "HCY31HBU4TM", "google_name": "Rafael Cantu", "google_first_name": "Jermaine", "google_last_name": "Montoya", "google_hd": "Faucibus Leo Inc.", "google_email": "arcu.et@egestasSed.org"},
//        {"google_id": 103, "google_token": "CEQ68DFL5WO", "google_name": "Brandon Aguilar", "google_first_name": "Thor", "google_last_name": "Tucker", "google_hd": "Parturient LLC", "google_email": "aliquam.arcu.Aliquam@fringillacursuspurus.co.uk"},
//        {"google_id": 104, "google_token": "JBF01SDY5SN", "google_name": "Austin Frye", "google_first_name": "Ronan", "google_last_name": "Holcomb", "google_hd": "Libero Mauris Aliquam LLC", "google_email": "mollis.non.cursus@molestie.ca"},
//        {"google_id": 105, "google_token": "WQQ08RLK4PO", "google_name": "Slade Rowland", "google_first_name": "Acton", "google_last_name": "Myers", "google_hd": "Donec Nibh Enim Corp.", "google_email": "dis@lacusQuisque.edu"},
//        {"google_id": 106, "google_token": "CDU72AOZ1PT", "google_name": "Kyle Mann", "google_first_name": "Gareth", "google_last_name": "Atkinson", "google_hd": "Ut Limited", "google_email": "Curabitur@urnanec.net"},
//        {"google_id": 107, "google_token": "XPZ02VKV3HI", "google_name": "Quinn Hart", "google_first_name": "Todd", "google_last_name": "Chandler", "google_hd": "Egestas Lacinia PC", "google_email": "et@duinecurna.co.uk"},
//        {"google_id": 108, "google_token": "MBA46RQX7PH", "google_name": "Ivor Mccarthy", "google_first_name": "Bradley", "google_last_name": "Steele", "google_hd": "Accumsan Limited", "google_email": "Nam.consequat.dolor@mieleifendegestas.net"},
//        {"google_id": 109, "google_token": "CFD15QMK1ZB", "google_name": "Stuart Merrill", "google_first_name": "Linus", "google_last_name": "Petty", "google_hd": "Massa Lobortis Incorporated", "google_email": "elit.a@facilisiseget.com"},
//        {"google_id": 110, "google_token": "IHF46SRW4OS", "google_name": "Stone Shaw", "google_first_name": "Asher", "google_last_name": "Benson", "google_hd": "Diam Luctus Foundation", "google_email": "dolor.tempus.non@rhoncus.org"},
//        {"google_id": 111, "google_token": "NJC84GRK6SS", "google_name": "Lane Underwood", "google_first_name": "Chaney", "google_last_name": "Hahn", "google_hd": "Mi Lorem Company", "google_email": "erat.in@idenimCurabitur.ca"},
//        {"google_id": 112, "google_token": "JTE05PKK7PV", "google_name": "Edan Austin", "google_first_name": "Len", "google_last_name": "Shelton", "google_hd": "Velit Quisque Varius LLP", "google_email": "Mauris.vestibulum@montesnasceturridiculus.edu"},
//        {"google_id": 113, "google_token": "HRP86ETC1YI", "google_name": "Xenos Frank", "google_first_name": "Merrill", "google_last_name": "Osborne", "google_hd": "Consequat Enim Diam Corporation", "google_email": "lacinia@eget.edu"},
//        {"google_id": 114, "google_token": "EXK40SJH6ZJ", "google_name": "Vladimir Small", "google_first_name": "Stuart", "google_last_name": "Hahn", "google_hd": "Arcu Vestibulum Ante PC", "google_email": "urna.Ut@ultrices.com"},
//        {"google_id": 115, "google_token": "ATI13BZG1WJ", "google_name": "Damian Jackson", "google_first_name": "Rigel", "google_last_name": "Martin", "google_hd": "Ante Blandit Ltd", "google_email": "montes.nascetur.ridiculus@suscipitest.com"},
//        {"google_id": 116, "google_token": "GFG33DTQ6YV", "google_name": "Laith Hooper", "google_first_name": "Vance", "google_last_name": "Christian", "google_hd": "A Feugiat Tellus LLP", "google_email": "Cras@purusactellus.org"},
//        {"google_id": 117, "google_token": "RAU55FMT0CQ", "google_name": "Castor Gibson", "google_first_name": "Driscoll", "google_last_name": "Romero", "google_hd": "Phasellus Limited", "google_email": "netus@egetvenenatis.org"},
//        {"google_id": 118, "google_token": "KZS70HGD9SO", "google_name": "Declan Porter", "google_first_name": "Phillip", "google_last_name": "Moore", "google_hd": "Magna Et Ipsum LLC", "google_email": "Donec@non.net"},
//        {"google_id": 119, "google_token": "KGF33IHO4SW", "google_name": "Stone Hunter", "google_first_name": "Abel", "google_last_name": "Carlson", "google_hd": "Eu Incorporated", "google_email": "sodales@posuereat.co.uk"},
//        {"google_id": 120, "google_token": "VNM63TYQ8DY", "google_name": "Erich Lawrence", "google_first_name": "Victor", "google_last_name": "Wilder", "google_hd": "Phasellus Vitae PC", "google_email": "convallis.dolor@nec.net"},
//        {"google_id": 121, "google_token": "VCK02GGF4PE", "google_name": "Joseph Bowers", "google_first_name": "Kirk", "google_last_name": "Dalton", "google_hd": "Est Nunc Incorporated", "google_email": "nisi.a.odio@atsemmolestie.com"},
//        {"google_id": 122, "google_token": "LIF06VZT9DL", "google_name": "Fletcher Benton", "google_first_name": "Graiden", "google_last_name": "Terry", "google_hd": "Orci Phasellus Industries", "google_email": "pellentesque@cursus.ca"},
//        {"google_id": 123, "google_token": "DLS55HKK5YH", "google_name": "Vaughan May", "google_first_name": "Lucius", "google_last_name": "Young", "google_hd": "Convallis Dolor Quisque Associates", "google_email": "sollicitudin.adipiscing@Aenean.ca"},
//        {"google_id": 124, "google_token": "EFO16DPB8DM", "google_name": "Keaton Merritt", "google_first_name": "Edward", "google_last_name": "Lara", "google_hd": "Turpis In Condimentum Industries", "google_email": "lectus.quis@feugiattelluslorem.com"},
//        {"google_id": 125, "google_token": "SSB04YWB9MP", "google_name": "Thane Hahn", "google_first_name": "Dustin", "google_last_name": "Wolf", "google_hd": "Quam Dignissim Pharetra Ltd", "google_email": "sed@dis.edu"},
//        {"google_id": 126, "google_token": "ZMG03VXY4OX", "google_name": "Abel Keller", "google_first_name": "Aidan", "google_last_name": "Sykes", "google_hd": "Sodales Elit Erat Foundation", "google_email": "dapibus@Vestibulumante.ca"},
//        {"google_id": 127, "google_token": "EJE66XFS0BN", "google_name": "Josiah Snow", "google_first_name": "Cade", "google_last_name": "Whitney", "google_hd": "Pharetra Quisque Inc.", "google_email": "egestas@vehiculaet.org"},
//        {"google_id": 128, "google_token": "LNM37APY7YL", "google_name": "Marshall Hogan", "google_first_name": "Josiah", "google_last_name": "Lowery", "google_hd": "Eu Tempor Erat Associates", "google_email": "tincidunt@sitamet.com"},
//        {"google_id": 129, "google_token": "ZRD56LKK8EE", "google_name": "Cullen Johnston", "google_first_name": "Emerson", "google_last_name": "Carroll", "google_hd": "Eget Metus Company", "google_email": "Nulla.aliquet@dictumeueleifend.net"},
//        {"google_id": 130, "google_token": "FBM76YKM2MQ", "google_name": "Paul Newman", "google_first_name": "Brenden", "google_last_name": "Beard", "google_hd": "Euismod Incorporated", "google_email": "a@dui.edu"},
//        {"google_id": 131, "google_token": "CJD72SOT5ME", "google_name": "Craig Durham", "google_first_name": "Mark", "google_last_name": "Copeland", "google_hd": "Proin LLC", "google_email": "iaculis.enim@ipsumDonecsollicitudin.ca"},
//        {"google_id": 132, "google_token": "REW65TEJ9IH", "google_name": "Rogan Kaufman", "google_first_name": "Uriah", "google_last_name": "Gay", "google_hd": "Tincidunt Corporation", "google_email": "euismod@arcu.ca"},
//        {"google_id": 133, "google_token": "QBP30SKG6PX", "google_name": "Troy Weeks", "google_first_name": "Yardley", "google_last_name": "Aguirre", "google_hd": "At Industries", "google_email": "volutpat.Nulla.facilisis@ridiculusmusAenean.org"},
//        {"google_id": 134, "google_token": "GVM46ELQ6LG", "google_name": "Warren Sweeney", "google_first_name": "Bruce", "google_last_name": "Bernard", "google_hd": "Viverra Associates", "google_email": "Donec.egestas.Aliquam@orciUtsemper.com"},
//        {"google_id": 135, "google_token": "GFE33YVI1WJ", "google_name": "Damon Skinner", "google_first_name": "William", "google_last_name": "Ratliff", "google_hd": "Mauris Quis PC", "google_email": "posuere.at.velit@utlacus.com"},
//        {"google_id": 136, "google_token": "DMM63PLQ3SU", "google_name": "Blake Livingston", "google_first_name": "Aristotle", "google_last_name": "Rowland", "google_hd": "Orci Luctus Institute", "google_email": "lobortis.quis.pede@tempor.edu"},
//        {"google_id": 137, "google_token": "MZU22BYG8FC", "google_name": "Edan Daniel", "google_first_name": "Dustin", "google_last_name": "Sears", "google_hd": "Auctor Corp.", "google_email": "Maecenas.libero@In.ca"},
//        {"google_id": 138, "google_token": "TAH37HBS4OS", "google_name": "Leonard Watson", "google_first_name": "Jamal", "google_last_name": "Battle", "google_hd": "Mauris Ipsum Porta Corp.", "google_email": "pulvinar@molestiearcu.org"},
//        {"google_id": 139, "google_token": "AVV39QJP5CF", "google_name": "Rahim Hartman", "google_first_name": "Luke", "google_last_name": "Griffith", "google_hd": "Magna Sed Eu Inc.", "google_email": "Nunc@tincidunt.co.uk"},
//        {"google_id": 140, "google_token": "LYT28XEE1SH", "google_name": "Xenos Jensen", "google_first_name": "Adrian", "google_last_name": "Ochoa", "google_hd": "Lorem Consulting", "google_email": "mi@diamDuis.org"},
//        {"google_id": 141, "google_token": "QZW76TFU6RN", "google_name": "Drew Everett", "google_first_name": "Armando", "google_last_name": "Pruitt", "google_hd": "Ut Semper Pretium Associates", "google_email": "vitae.diam@sed.ca"},
//        {"google_id": 142, "google_token": "UAH05HMR0WN", "google_name": "Preston Mcguire", "google_first_name": "Fuller", "google_last_name": "Cobb", "google_hd": "Fusce Dolor Quam Corporation", "google_email": "tempor.est@tincidunt.co.uk"},
//        {"google_id": 143, "google_token": "KKQ65HRY8GZ", "google_name": "Avram Bradley", "google_first_name": "Garrett", "google_last_name": "Riggs", "google_hd": "Lorem Eget Mollis Corporation", "google_email": "felis.purus@consectetueripsum.net"},
//        {"google_id": 144, "google_token": "VNH04QNE9MT", "google_name": "Evan Hatfield", "google_first_name": "Fuller", "google_last_name": "Robles", "google_hd": "Gravida Molestie Limited", "google_email": "facilisi.Sed@maurisInteger.edu"},
//        {"google_id": 145, "google_token": "XXI24WPY0BO", "google_name": "Harlan Kemp", "google_first_name": "Nicholas", "google_last_name": "Whitley", "google_hd": "Velit Aliquam Incorporated", "google_email": "interdum.feugiat@non.org"},
//        {"google_id": 146, "google_token": "UHG04ZLC9WI", "google_name": "Griffith Williams", "google_first_name": "Reese", "google_last_name": "Hogan", "google_hd": "Gravida Non Sollicitudin Corporation", "google_email": "urna@nonenimcommodo.ca"},
//        {"google_id": 147, "google_token": "MXR21IMW0ME", "google_name": "Chase Rodriguez", "google_first_name": "Colt", "google_last_name": "Baker", "google_hd": "Quis Arcu Company", "google_email": "eget.volutpat.ornare@ultricies.org"},
//        {"google_id": 148, "google_token": "AQX39CVV0QM", "google_name": "Garth Beard", "google_first_name": "Victor", "google_last_name": "Cochran", "google_hd": "Tellus LLC", "google_email": "imperdiet@felisullamcorper.co.uk"},
//        {"google_id": 149, "google_token": "XZO55GPT9DL", "google_name": "Xenos Becker", "google_first_name": "Cadman", "google_last_name": "Mcgee", "google_hd": "A Consulting", "google_email": "ultrices.Duis@euarcu.com"},
//        {"google_id": 150, "google_token": "XJK06GDM5QB", "google_name": "Joshua Cote", "google_first_name": "Erasmus", "google_last_name": "Stuart", "google_hd": "Quis Associates", "google_email": "Nulla@erategetipsum.com"},
//        {"google_id": 151, "google_token": "IKO20EEJ2TB", "google_name": "Kenyon Barrera", "google_first_name": "Kadeem", "google_last_name": "Jacobs", "google_hd": "Consequat Auctor Industries", "google_email": "elit.Curabitur@sapiengravida.co.uk"},
//        {"google_id": 152, "google_token": "BNY09DZG0RT", "google_name": "Tad Jenkins", "google_first_name": "Oscar", "google_last_name": "Bullock", "google_hd": "Donec Egestas Duis Inc.", "google_email": "magna@justo.edu"},
//        {"google_id": 153, "google_token": "PNR56RRM1NM", "google_name": "Christian Morales", "google_first_name": "Hakeem", "google_last_name": "Nixon", "google_hd": "Auctor Odio Foundation", "google_email": "et.magnis@tempusmauris.com"},
//        {"google_id": 154, "google_token": "ELF90ZGE6VI", "google_name": "Stewart Long", "google_first_name": "Channing", "google_last_name": "Mayo", "google_hd": "Et Lacinia Foundation", "google_email": "metus.vitae@eusem.org"},
//        {"google_id": 155, "google_token": "IEM07PKJ1SY", "google_name": "Ignatius Trujillo", "google_first_name": "Keane", "google_last_name": "Merrill", "google_hd": "Mauris Inc.", "google_email": "Sed.malesuada@disparturient.net"},
//        {"google_id": 156, "google_token": "HWF24KBJ5DE", "google_name": "Sebastian Calhoun", "google_first_name": "Kieran", "google_last_name": "Sampson", "google_hd": "Vitae Velit Egestas Inc.", "google_email": "vitae.odio.sagittis@aarcu.co.uk"},
//        {"google_id": 157, "google_token": "AZR76DMP5SJ", "google_name": "Lionel Mendez", "google_first_name": "Dominic", "google_last_name": "Roy", "google_hd": "Lorem Sit Amet Limited", "google_email": "hendrerit.neque.In@magnisdisparturient.ca"},
//        {"google_id": 158, "google_token": "IJL97XUH3LE", "google_name": "Chester Nielsen", "google_first_name": "Honorato", "google_last_name": "David", "google_hd": "Convallis Dolor Quisque LLC", "google_email": "blandit.Nam.nulla@eleifendnunc.edu"},
//        {"google_id": 159, "google_token": "VSQ30JLB5PL", "google_name": "Elton Reyes", "google_first_name": "Xanthus", "google_last_name": "Macdonald", "google_hd": "Odio Corp.", "google_email": "mattis@Quisquelibero.co.uk"},
//        {"google_id": 160, "google_token": "NSD64MVQ0IY", "google_name": "Stephen Rhodes", "google_first_name": "Dennis", "google_last_name": "Barber", "google_hd": "Suspendisse Eleifend LLC", "google_email": "tempus@Aliquam.com"},
//        {"google_id": 161, "google_token": "TNP03KFD7ZY", "google_name": "Perry Gomez", "google_first_name": "Lionel", "google_last_name": "Gallagher", "google_hd": "Integer Eu Consulting", "google_email": "nec@egetlaoreet.net"},
//        {"google_id": 162, "google_token": "AMO79FPA9JX", "google_name": "Oleg Ortega", "google_first_name": "Noble", "google_last_name": "Woodward", "google_hd": "Est Nunc Consulting", "google_email": "ultrices.posuere@montesnascetur.ca"},
//        {"google_id": 163, "google_token": "YZI57SNB8PQ", "google_name": "Daquan Stokes", "google_first_name": "Cadman", "google_last_name": "Harrell", "google_hd": "Orci Donec Nibh LLC", "google_email": "purus@nibh.org"},
//        {"google_id": 164, "google_token": "GDC59IUV6GC", "google_name": "Flynn Mcpherson", "google_first_name": "Fritz", "google_last_name": "Witt", "google_hd": "Sed Associates", "google_email": "bibendum@maurissit.edu"},
//        {"google_id": 165, "google_token": "DGN15WWX5HI", "google_name": "Cruz English", "google_first_name": "Murphy", "google_last_name": "Mccray", "google_hd": "Lorem Vitae Odio Foundation", "google_email": "sodales.Mauris.blandit@Integeraliquamadipiscing.co.uk"},
//        {"google_id": 166, "google_token": "BHR07IEW7GC", "google_name": "Geoffrey Garcia", "google_first_name": "Yardley", "google_last_name": "Espinoza", "google_hd": "Lacus Corp.", "google_email": "odio.Etiam@tristiquealiquetPhasellus.org"},
//        {"google_id": 167, "google_token": "ORF70TUR7BU", "google_name": "Zahir Roberson", "google_first_name": "Zeus", "google_last_name": "Kramer", "google_hd": "Vivamus Limited", "google_email": "odio.auctor.vitae@ipsum.com"},
//        {"google_id": 168, "google_token": "OFJ15BAC0LG", "google_name": "Daquan Ortega", "google_first_name": "Lester", "google_last_name": "Kidd", "google_hd": "Purus Accumsan Associates", "google_email": "torquent.per.conubia@egestasnunc.net"},
//        {"google_id": 169, "google_token": "VFP63SES8JI", "google_name": "Oscar Hyde", "google_first_name": "Harding", "google_last_name": "Forbes", "google_hd": "Magna Sed Incorporated", "google_email": "aliquam.iaculis@velvulputate.ca"},
//        {"google_id": 170, "google_token": "GXE18IBG6KC", "google_name": "Levi Mullen", "google_first_name": "Avram", "google_last_name": "Beasley", "google_hd": "Risus Associates", "google_email": "Maecenas.mi@sit.ca"},
//        {"google_id": 171, "google_token": "EQE32BTN6UV", "google_name": "Beau Young", "google_first_name": "Rogan", "google_last_name": "Espinoza", "google_hd": "Odio PC", "google_email": "Phasellus.vitae@euturpisNulla.co.uk"},
//        {"google_id": 172, "google_token": "LMJ39PEX1KJ", "google_name": "Blake Mayer", "google_first_name": "Paki", "google_last_name": "Austin", "google_hd": "Primis In Faucibus Company", "google_email": "a@urna.ca"},
//        {"google_id": 173, "google_token": "KQR99FGP4RZ", "google_name": "Russell Mcintyre", "google_first_name": "Calvin", "google_last_name": "Murphy", "google_hd": "Nascetur Inc.", "google_email": "sem.mollis.dui@lobortisauguescelerisque.ca"},
//        {"google_id": 174, "google_token": "BUD55TYP7AF", "google_name": "Channing Vang", "google_first_name": "Marvin", "google_last_name": "Wong", "google_hd": "Ut Limited", "google_email": "orci.Ut.sagittis@molestiedapibusligula.net"},
//        {"google_id": 175, "google_token": "JCA37YVZ3IN", "google_name": "Ivor Moody", "google_first_name": "Demetrius", "google_last_name": "Dickerson", "google_hd": "Quis Arcu Foundation", "google_email": "vulputate.ullamcorper@enim.ca"},
//        {"google_id": 176, "google_token": "URW16JNJ1JT", "google_name": "Baker Hobbs", "google_first_name": "Magee", "google_last_name": "Day", "google_hd": "Ipsum Consulting", "google_email": "consectetuer.adipiscing.elit@Aliquam.co.uk"},
//        {"google_id": 177, "google_token": "YHL40WVZ7VK", "google_name": "Lester Lee", "google_first_name": "Orlando", "google_last_name": "Guzman", "google_hd": "Cras Vehicula Limited", "google_email": "felis@ac.org"},
//        {"google_id": 178, "google_token": "AJB67HTK0KU", "google_name": "Galvin Sparks", "google_first_name": "Tyrone", "google_last_name": "Blake", "google_hd": "Ligula Aliquam Limited", "google_email": "ante@nibhlaciniaorci.co.uk"},
//        {"google_id": 179, "google_token": "MVX15OHT8BQ", "google_name": "Colin Wright", "google_first_name": "Jordan", "google_last_name": "Chan", "google_hd": "Ac Mattis Velit Corp.", "google_email": "mauris.Suspendisse@turpisNullaaliquet.edu"},
//        {"google_id": 180, "google_token": "GMQ21KAW5AI", "google_name": "Chaim Jones", "google_first_name": "Colt", "google_last_name": "Sandoval", "google_hd": "Lorem Vehicula Et Corp.", "google_email": "Aliquam.erat@auctorvelit.co.uk"},
//        {"google_id": 181, "google_token": "XWO82VKX1RE", "google_name": "Carlos Floyd", "google_first_name": "Hop", "google_last_name": "Hubbard", "google_hd": "Urna LLP", "google_email": "Quisque.ornare.tortor@iaculis.edu"},
//        {"google_id": 182, "google_token": "MTT65UJX0YV", "google_name": "Victor Blanchard", "google_first_name": "Clinton", "google_last_name": "Velasquez", "google_hd": "Felis Donec Tempor Foundation", "google_email": "sed.turpis@vulputaterisusa.ca"},
//        {"google_id": 183, "google_token": "UCS84ADS8OL", "google_name": "Raphael Perez", "google_first_name": "Gannon", "google_last_name": "Benton", "google_hd": "Id LLC", "google_email": "sed@egetmetusIn.com"},
//        {"google_id": 184, "google_token": "ZJV50EQT4ZH", "google_name": "Walker Robles", "google_first_name": "Silas", "google_last_name": "Adams", "google_hd": "Dui Quis Accumsan Institute", "google_email": "primis.in@egestasadui.com"},
//        {"google_id": 185, "google_token": "ZTG33XLQ1JV", "google_name": "George Schroeder", "google_first_name": "Basil", "google_last_name": "Prince", "google_hd": "Sagittis Institute", "google_email": "Suspendisse@Aenean.co.uk"},
//        {"google_id": 186, "google_token": "JWB76TTV5LY", "google_name": "Edward Erickson", "google_first_name": "Wang", "google_last_name": "Pennington", "google_hd": "Posuere Vulputate Consulting", "google_email": "rutrum.magna@sitamet.edu"},
//        {"google_id": 187, "google_token": "YGQ18SHE5XC", "google_name": "Allistair Jones", "google_first_name": "Omar", "google_last_name": "Jones", "google_hd": "Ridiculus Mus Aenean Incorporated", "google_email": "tempor.bibendum.Donec@Morbivehicula.edu"},
//        {"google_id": 188, "google_token": "CPZ71QWO6VV", "google_name": "Elmo Sanders", "google_first_name": "Xavier", "google_last_name": "Lucas", "google_hd": "Mauris Ut Corp.", "google_email": "nec@mi.org"},
//        {"google_id": 189, "google_token": "YUG84QRD4TM", "google_name": "Barry Fitzgerald", "google_first_name": "Rahim", "google_last_name": "Goodwin", "google_hd": "Ipsum PC", "google_email": "consectetuer.mauris@aultriciesadipiscing.org"},
//        {"google_id": 190, "google_token": "URU41VHI1RZ", "google_name": "Perry Lott", "google_first_name": "Kibo", "google_last_name": "Williamson", "google_hd": "Nunc Ac Incorporated", "google_email": "Nulla@dapibusidblandit.com"},
//        {"google_id": 191, "google_token": "XUA84ZWO6VS", "google_name": "Lester Colon", "google_first_name": "Ferris", "google_last_name": "Hinton", "google_hd": "Tempor Arcu Corporation", "google_email": "blandit.viverra@odioNaminterdum.org"},
//        {"google_id": 192, "google_token": "HPA25YUZ7CF", "google_name": "Kermit Fields", "google_first_name": "Hiram", "google_last_name": "Burks", "google_hd": "Elit Erat LLP", "google_email": "ultricies@duiCumsociis.org"},
//        {"google_id": 193, "google_token": "QXK93HIH4UD", "google_name": "Caesar Pearson", "google_first_name": "Alden", "google_last_name": "Eaton", "google_hd": "Metus Aliquam Incorporated", "google_email": "conubia@fermentumarcu.ca"},
//        {"google_id": 194, "google_token": "ISM19EEH0DC", "google_name": "Brock Peck", "google_first_name": "Jin", "google_last_name": "Norman", "google_hd": "Et Ultrices Posuere Associates", "google_email": "mi@mattissemperdui.ca"},
//        {"google_id": 195, "google_token": "DRZ12YAB3CI", "google_name": "Wayne Mitchell", "google_first_name": "Price", "google_last_name": "Irwin", "google_hd": "Amet PC", "google_email": "quis.pede@Proinmi.ca"},
//        {"google_id": 196, "google_token": "KYI83NTW8VY", "google_name": "Wing Hurst", "google_first_name": "Walker", "google_last_name": "Zamora", "google_hd": "Auctor Velit PC", "google_email": "adipiscing.elit@etlacinia.edu"},
//        {"google_id": 197, "google_token": "BQL24IBQ7EA", "google_name": "Amal Odom", "google_first_name": "Adrian", "google_last_name": "Roberson", "google_hd": "Dui Lectus Rutrum Corporation", "google_email": "elementum@erat.com"},
//        {"google_id": 198, "google_token": "SES67ZAQ8IN", "google_name": "Elton Rhodes", "google_first_name": "Richard", "google_last_name": "Rich", "google_hd": "Elit A Incorporated", "google_email": "natoque.penatibus@purusmaurisa.com"},
//        {"google_id": 199, "google_token": "MVS16CBL2CY", "google_name": "Keefe Church", "google_first_name": "Orson", "google_last_name": "Dotson", "google_hd": "Nullam Feugiat Placerat LLC", "google_email": "imperdiet@placerat.com"}
//    ];
    this.aryUsers = [{"email": "abel.luvello@fch.cl"},
        {"email": "abisai.queupuan@fch.cl"},
        {"email": "agustina.mohando@fch.cl"},
        {"email": "aida.varas@fch.cl"},
        {"email": "alejandra.arochas@fch.cl"},
        {"email": "alejandra.gonzalez@estudiante.fch.cl"},
        {"email": "alejandra.guzman@fch.cl"},
        {"email": "alejandra.olhagaray@fch.cl"},
        {"email": "alejandra.rojas@estudiante.fch.cl"},
        {"email": "alejandro.florenzano@fch.cl"},
        {"email": "alejandro.tocigl@fch.cl"},
        {"email": "alexis.deponson@fch.cl"},
        {"email": "alfredo.lopez@estudiante.fch.cl"},
        {"email": "alfredo.vargas@consultor.fch.cl"},
        {"email": "alicia.salazar@estudiante.fch.cl"},
        {"email": "allan.guiloff@fch.cl"},
        {"email": "alvaro.aguilar@fch.cl"},
        {"email": "alvaro.fischer@fch.cl"},
        {"email": "alvaro.fuentealba@fch.cl"},
        {"email": "alvaro.jeldres@estudiante.fch.cl"},
        {"email": "amaya.hernando@fch.cl"},
        {"email": "ana.cabello@fch.cl"},
        {"email": "ana.galleguillos@fch.cl"},
        {"email": "ana.munoz@fch.cl"},
        {"email": "ana.yanez@fch.cl"},
        {"email": "anamaria.raad@fch.cl"},
        {"email": "anamaria.ruz@fch.cl"},
        {"email": "andrea.adrove@fch.cl"},
        {"email": "andrea.cino@estudiante.fch.cl"},
        {"email": "andrea.cino@fch.cl"},
        {"email": "andrea.horn@consultor.fch.cl"},
        {"email": "andrea.martinez@consultor.fch.cl"},
        {"email": "andrea.olguin@fch.cl"},
        {"email": "andrea.osorio@fch.cl"},
        {"email": "andrea.sepulveda@fch.cl"},
        {"email": "andrea.silva@fch.cl"},
        {"email": "andrea.yanez@fch.cl"},
        {"email": "andres.barros@fch.cl"},
        {"email": "andres.perez@fch.cl"},
        {"email": "andres.pesce@fch.cl"},
        {"email": "andres.rolon@fch.cl"},
        {"email": "angela.oblasser@fch.cl"},
        {"email": "angelica.fuenzalida@fch.cl"},
        {"email": "angelica.munoz@fch.cl"},
        {"email": "annie.dufey@fch.cl"},
        {"email": "antonio.velez@fch.cl"},
        {"email": "aranza.hernandez@estudiante.fch.cl"},
        {"email": "ariel.riquelme@fch.cl"},
        {"email": "astrid.munzenmayer@estudiante.fch.cl"},
        {"email": "astrid.munzenmayer@fch.cl"},
        {"email": "axel.dourojeanni@fch.cl"},
        {"email": "axel.hidalgo@fch.cl"},
        {"email": "axel.klimpel@fch.cl"},
        {"email": "benjamin.lagos@estudiante.fch.cl"},
        {"email": "benjamin.robert@fch.cl"},
        {"email": "benjamin.rodriguez@fch.cl"},
        {"email": "berta.gonzalez@fch.cl"},
        {"email": "betsabe.ortiz@fch.cl"},
        {"email": "brenda.quine@consultor.fch.cl"},
        {"email": "brigitte.aubel@consultor.fch.cl"},
        {"email": "camila.olguin@fch.cl"},
        {"email": "camila.vega@fch.cl"},
        {"email": "camilo.fuentes@estudiante.fch.cl"},
        {"email": "carla.calderon@fch.cl"},
        {"email": "carla.fernandez@estudiante.fch.cl"},
        {"email": "carla.munoz@fch.cl"},
        {"email": "carlos.arcos@fch.cl"},
        {"email": "carlos.arias@estudiante.fch.cl"},
        {"email": "carlos.castillo@fch.cl"},
        {"email": "carlos.estrada@fch.cl"},
        {"email": "carlos.flores@fch.cl"},
        {"email": "carlos.ibanez@fch.cl"},
        {"email": "carlos.inostroza@fch.cl"},
        {"email": "carlos.lonza@fch.cl"},
        {"email": "carlos.silva@estudiante.fch.cl"},
        {"email": "carmen.duenas@fch.cl"},
        {"email": "carmen.maldonado@fch.cl"},
        {"email": "carmen.santacruz@consultor.fch.cl"},
        {"email": "carol.burgoa@fch.cl"},
        {"email": "carol.rivera@fch.cl"},
        {"email": "carola.gana@fch.cl"},
        {"email": "carola.lunser@fch.cl"},
        {"email": "carola.velasquez@fch.cl"},
        {"email": "carolina.aguila@fch.cl"},
        {"email": "carolina.cuevas@fch.cl"},
        {"email": "carolina.fellay@fch.cl"},
        {"email": "carolina.gutierrez@fch.cl"},
        {"email": "carolina.jaramillo@fch.cl"},
        {"email": "carolina.morales@fch.cl"},
        {"email": "carolina.morgan@fch.cl"},
        {"email": "carolina.palomero@fch.cl"},
        {"email": "carolina.peters@fch.cl"},
        {"email": "carolina.salazar@fch.cl"},
        {"email": "carolina.salinas@fch.cl"},
        {"email": "caroline.holo@fch.cl"},
        {"email": "catalina.balla@fch.cl"},
        {"email": "catalina.cortes@fch.cl"},
        {"email": "cecilia.vidal@fch.cl"},
        {"email": "cesar.barrera@fch.cl"},
        {"email": "cgloria.cortes@fch.cl"},
        {"email": "cgloria.solisdeovando@fch.cl"},
        {"email": "christian.morales@consultor.fch.cl"},
        {"email": "christian.schmidt@fch.cl"},
        {"email": "clarita.sotoaguilar@fch.cl"},
        {"email": "claudia.galleguillos@fch.cl"},
        {"email": "claudia.godoy@fch.cl"},
        {"email": "claudia.mansilla@fch.cl"},
        {"email": "claudia.pavez@fch.cl"},
        {"email": "claudia.razeto@fch.cl"},
        {"email": "claudia.vega@fch.cl"},
        {"email": "claudio.azocar@fch.cl"},
        {"email": "claudio.barraza@fch.cl"},
        {"email": "claudio.valdivia@fch.cl"},
        {"email": "comiteparitario@fch.cl"},
        {"email": "comunicacionesti@fch.cl"},
        {"email": "constanza.gutierrez@fch.cl"},
        {"email": "constanza.munoz@fch.cl"},
        {"email": "constanza.navarrete@fch.cl"},
        {"email": "constanza.reich@consultor.fch.cl"},
        {"email": "constanza.reich@fch.cl"},
        {"email": "consuelo.montalva@fch.cl"},
        {"email": "corina.acosta@fch.cl"},
        {"email": "cristian.alvarado@fch.cl"},
        {"email": "cristian.emhart@fch.cl"},
        {"email": "cristian.general@fch.cl"},
        {"email": "cristian.gonzalez@fch.cl"},
        {"email": "cristina.aziz@fch.cl"},
        {"email": "cristina.cabello@fch.cl"},
        {"email": "cristina.castillo@fch.cl"},
        {"email": "cristina.contreras@estudiante.fch.cl"},
        {"email": "cristobal.arteaga@fch.cl"},
        {"email": "cristobal.delamaza@fch.cl"},
        {"email": "cristobal.girardi@fch.cl"},
        {"email": "cristobal.loyola@fch.cl"},
        {"email": "daniel.vergara@fch.cl"},
        {"email": "daniela.bascunan@consultor.fch.cl"},
        {"email": "daniela.calderon@fch.cl"},
        {"email": "daniela.kework@fch.cl"},
        {"email": "daniela.torre@fch.cl"},
        {"email": "daniela.zenteno@fch.cl"},
        {"email": "dany.canales@fch.cl"},
        {"email": "david.munoz@estudiante.fch.cl"},
        {"email": "david.sepulveda@fch.cl"},
        {"email": "debora.gomberoff@fch.cl"},
        {"email": "diego.mendez@consultor.fch.cl"},
        {"email": "diego.richard@fch.cl"},
        {"email": "diego.schmidlin@estudiante.fch.cl"},
        {"email": "diego.torres@fch.cl"},
        {"email": "dinka.acevedo@fch.cl"},
        {"email": "dustin.gray@fch.cl"},
        {"email": "eduardo.diaz@fch.cl"},
        {"email": "eduardo.dominguez@fch.cl"},
        {"email": "eduardo.soto.s@fch.cl"},
        {"email": "eduardo.soto@fch.cl"},
        {"email": "eduardo.taucare@fch.cl"},
        {"email": "eduardo.valdes@fch.cl"},
        {"email": "elena.sanchis@fch.cl"},
        {"email": "elizabeth.ayala@fch.cl"},
        {"email": "elizabeth.vega@fch.cl"},
        {"email": "emilia.gonzalez@fch.cl"},
        {"email": "emilia.schlesinger@estudiante.fch.cl"},
        {"email": "enrique.molina@fch.cl"},
        {"email": "enrique.valdivia@fch.cl"},
        {"email": "ercio.baez@estudiante.fch.cl"},
        {"email": "erica.arancibia@fch.cl"},
        {"email": "erika.lopez@fch.cl"},
        {"email": "ernesto.olea@fch.cl"},
        {"email": "erosario.diaz@fch.cl"},
        {"email": "esteban.ibarra@fch.cl"},
        {"email": "esteban.leyton@fch.cl"},
        {"email": "eugenia.camazon@fch.cl"},
        {"email": "eva.devries@fch.cl"},
        {"email": "evelyn.bravo@fch.cl"},
        {"email": "fabian.carrizo@fch.cl"},
        {"email": "fabian.gonzalez@fch.cl"},
        {"email": "fanny.huilipan@fch.cl"},
        {"email": "fany.vera@fch.cl"},
        {"email": "felipe.briones@fch.cl"},
        {"email": "felipe.castro@fch.cl"},
        {"email": "felipe.contreras@consultor.fch.cl"},
        {"email": "felipe.dosal@fch.cl"},
        {"email": "felipe.magallon@fch.cl"},
        {"email": "felipe.villegas@estudiante.fch.cl"},
        {"email": "fernanda.briones@fch.cl"},
        {"email": "fernanda.caballero@fch.cl"},
        {"email": "fernanda.orellana@fch.cl"},
        {"email": "fernanda.trentacoste@fch.cl"},
        {"email": "fernanda.valdivieso@fch.cl"},
        {"email": "fernando.coz@fch.cl"},
        {"email": "fernando.diaz@fch.cl"},
        {"email": "fernando.gavilan@fch.cl"},
        {"email": "flavio.araya@fch.cl"},
        {"email": "flor.villarroel@fch.cl"},
        {"email": "francesca.orezzoli@estudiante.fch.cl"},
        {"email": "francisca.garces@estudiante.fch.cl"},
        {"email": "francisca.garrido@estudiante.fch.cl"},
        {"email": "francisca.guarda@fch.cl"},
        {"email": "francisca.petrovich@fch.cl"},
        {"email": "francisca.vergara@fch.cl"},
        {"email": "francisco.campos@estudiante.fch.cl"},
        {"email": "francisco.fernandez@fch.cl"},
        {"email": "francisco.klima@fch.cl"},
        {"email": "francisco.leiva@fch.cl"},
        {"email": "francisco.olivares@estudiante.fch.cl"},
        {"email": "franco.alvarez@fch.cl"},
        {"email": "franco.sepulveda@fch.cl"},
        {"email": "francoise.tirreau@fch.cl"},
        {"email": "gabriel.leyton@fch.cl"},
        {"email": "gabriel.perez.old@gtnla.cl"},
        {"email": "gabriel.rojas@fch.cl"},
        {"email": "gabriela.arcos@fch.cl"},
        {"email": "gabriela.morales@fch.cl"},
        {"email": "gerardo.diaz@fch.cl"},
        {"email": "german.vargas@fch.cl"},
        {"email": "giannina.fazzi@fch.cl"},
        {"email": "gilda.zuniga@fch.cl"},
        {"email": "gino.mamani@fch.cl"},
        {"email": "gisela.bohe@fch.cl"},
        {"email": "gladys.cid@fch.cl"},
        {"email": "gloria.garin@fch.cl"},
        {"email": "gonzalo.diaz@fch.cl"},
        {"email": "gonzalo.leon@fch.cl"},
        {"email": "gperez@gtnla.cl"},
        {"email": "gustavo.correa@fch.cl"},
        {"email": "hector.arriagada@estudiante.fch.cl"},
        {"email": "hector.munoz@fch.cl"},
        {"email": "hector.urrutia@fch.cl"},
        {"email": "henry.rojas@fch.cl"},
        {"email": "herman.alarcon@fch.cl"},
        {"email": "hernan.araneda@fch.cl"},
        {"email": "hernan.osorio@fch.cl"},
        {"email": "ignacio.gonzalez@estudiante.fch.cl"},
        {"email": "ignacio.guzman@consultor.fch.cl"},
        {"email": "ignacio.riffo@fch.cl"},
        {"email": "ignacio.suazo@fch.cl"},
        {"email": "igor.vidal@fch.cl"},
        {"email": "ilse.vega@estudiante.fch.cl"},
        {"email": "ingrid.gonzalez@fch.cl"},
        {"email": "inigo.olavarria@fch.cl"},
        {"email": "isabel.arriagada@fch.cl"},
        {"email": "isabel.lillo@fch.cl"},
        {"email": "isaura.tello@fch.cl"},
        {"email": "ivan.diaz@fch.cl"},
        {"email": "j.candia@fch.cl"},
        {"email": "jacqueline.astorga@estudiante.fch.cl"},
        {"email": "jaime.ramirez@fch.cl"},
        {"email": "jamie.riggs@fch.cl"},
        {"email": "jamie.silva@fch.cl"},
        {"email": "javier.alcaino@fch.cl"},
        {"email": "javier.lopez@fch.cl"},
        {"email": "javiera.alarcon@estudiante.fch.cl"},
        {"email": "javiera.iribarren@fch.cl"},
        {"email": "javiera.ortega@fch.cl"},
        {"email": "javiera.ramirez@consultor.fch.cl"},
        {"email": "jcarlos.lopez@fch.cl"},
        {"email": "jcarlos.olguin@fch.cl"},
        {"email": "jeniffer.pardo@fch.cl"},
        {"email": "jennifer.obregon@fch.cl"},
        {"email": "jessica.vivar@fch.cl"},
        {"email": "jignacio.bravo@fch.cl"},
        {"email": "jignacio.montenegro@fch.cl"},
        {"email": "jimena.carrasco@fch.cl"},
        {"email": "jmiguel.pascual@estudiante.fch.cl"},
        {"email": "joaquin.cordua@fch.cl"},
        {"email": "joel.figueroa@fch.cl"},
        {"email": "jorge.alarcon@fch.cl"},
        {"email": "jorge.espinoza@fch.cl"},
        {"email": "jorge.gonzalez@fch.cl"},
        {"email": "jorge.guevara@fch.cl"},
        {"email": "jose.aguilera@estudiante.fch.cl"},
        {"email": "jose.almonacid@fch.cl"},
        {"email": "jose.gonzalez@fch.cl"},
        {"email": "jose.gonzalezv@fch.cl"},
        {"email": "jose.juica@fch.cl"},
        {"email": "jose.maldonado@fch.cl"},
        {"email": "jose.oyarzo@fch.cl"},
        {"email": "jose.saud@fch.cl"},
        {"email": "jose.vera@fch.cl"},
        {"email": "josefa.vergara@fch.cl"},
        {"email": "joselyn.diaz@fch.cl"},
        {"email": "josu.sedano@fch.cl"},
        {"email": "josue.lagos@fch.cl"},
        {"email": "jtomas.garcia@estudiante.fch.cl"},
        {"email": "jtomas.novoa@fch.cl"},
        {"email": "juan.calbun@fch.cl"},
        {"email": "juan.leon@fch.cl"},
        {"email": "juan.mellado@fch.cl"},
        {"email": "juan.orlandi@fch.cl"},
        {"email": "juan.sanchez@fch.cl"},
        {"email": "juan.vargas@fch.cl"},
        {"email": "juanperez@fch.cl"},
        {"email": "julia.aravena@fch.cl"},
        {"email": "julio.reyes@fch.cl"},
        {"email": "jutta.hoppe@fch.cl"},
        {"email": "karen.ubilla@fch.cl"},
        {"email": "karien.volker@fch.cl"},
        {"email": "katalina.diaz@fch.cl"},
        {"email": "katherine.noack@fch.cl"},
        {"email": "kattaryne.vasquez@fch.cl"},
        {"email": "kimberly.santana@estudiante.fch.cl"},
        {"email": "leah.pollak@fch.cl"},
        {"email": "leonardo.grinen@fch.cl"},
        {"email": "leticia.fuentes@fch.cl"},
        {"email": "leyla.morales@fch.cl"},
        {"email": "lhernan.vicente@fch.cl"},
        {"email": "lilian.veas@fch.cl"},
        {"email": "lina.zhu@estudiante.fch.cl"},
        {"email": "liza.torres@fch.cl"},
        {"email": "lorena.ortiz@fch.cl"},
        {"email": "lorena.ruiz@fch.cl"},
        {"email": "lorena.veliz@fch.cl"},
        {"email": "loreto.poblete@fch.cl"},
        {"email": "loreto.santana@fch.cl"},
        {"email": "luis.briones@fch.cl"},
        {"email": "luis.lebtun@fch.cl"},
        {"email": "luis.villarroel@fch.cl"},
        {"email": "luisa.perez@fch.cl"},
        {"email": "mabel.araya@consultor.fch.cl"},
        {"email": "macarena.castillo@fch.cl"},
        {"email": "macarena.cisternas@fch.cl"},
        {"email": "macarena.dominguez@fch.cl"},
        {"email": "macarena.laso@fch.cl"},
        {"email": "macarena.leon@fch.cl"},
        {"email": "macarena.weis@fch.cl"},
        {"email": "magdalena.jimenez@estudiante.fch.cl"},
        {"email": "magdalena.medina@fch.cl"},
        {"email": "manuel.ureta@fch.cl"},
        {"email": "manuela.montes@estudiante.fch.cl"},
        {"email": "marcela.delpiano@fch.cl"},
        {"email": "marcela.escaff@fch.cl"},
        {"email": "marcela.nunez@fch.cl"},
        {"email": "marcela.rosas@fch.cl"},
        {"email": "marcela.ureta@fch.cl"},
        {"email": "marcelo.alfaro@fch.cl"},
        {"email": "marco.lofat@fch.cl"},
        {"email": "marco.perez@estudiante.fch.cl"},
        {"email": "marcos.cordero@fch.cl"},
        {"email": "marcos.kulka@fch.cl"},
        {"email": "margot.quintana@fch.cl"},
        {"email": "maria.santelices@consultor.fch.cl"},
        {"email": "mariana.aguirre@fch.cl"},
        {"email": "mariana.silva@consultor.fch.cl"},
        {"email": "marianela.hurtado@estudiante.fch.cl"},
        {"email": "maribel.lillo@fch.cl"},
        {"email": "maribel.viera@fch.cl"},
        {"email": "maricel.inostroza@fch.cl"},
        {"email": "marietta.barsocchini@fch.cl"},
        {"email": "mario.espinoza@fch.cl"},
        {"email": "mario.uribe@fch.cl"},
        {"email": "marion.oria@estudiante.fch.cl"},
        {"email": "marisol.silva@fch.cl"},
        {"email": "marjorie.caceres@fch.cl"},
        {"email": "marjorie.santana@fch.cl"},
        {"email": "marta.mansilla@fch.cl"},
        {"email": "martin.elton@fch.cl"},
        {"email": "martin.fuentes@fch.cl"},
        {"email": "martin.hevia@fch.cl"},
        {"email": "matias.gonzalez@estudiante.fch.cl"},
        {"email": "matias.prieto@estudiante.fch.cl"},
        {"email": "mauricio.becerra@fch.cl"},
        {"email": "mauricio.farias@fch.cl"},
        {"email": "mauricio.rodriguez@fch.cl"},
        {"email": "mauricio.toro@fch.cl"},
        {"email": "maurizio.moschini@fch.cl"},
        {"email": "mauro.valdes@consultor.fch.cl"},
        {"email": "maximiliano.montecinos@fch.cl"},
        {"email": "mcarolina.soto@fch.cl"},
        {"email": "mcristina.cubillos@fch.cl"},
        {"email": "melisa.zepeda@fch.cl"},
        {"email": "melissa.mora@fch.cl"},
        {"email": "meugenia.fernandez@fch.cl"},
        {"email": "meugenia.venegas@fch.cl"},
        {"email": "michelle.astuya@fch.cl"},
        {"email": "michelle.herve@fch.cl"},
        {"email": "michelle.senerman@fch.cl"},
        {"email": "milena.gonzalez@estudiante.fch.cl"},
        {"email": "milena.grunwald@fch.cl"},
        {"email": "militza.barcina@fch.cl"},
        {"email": "milos.gubic@estudiante.fch.cl"},
        {"email": "mines.alvarez@fch.cl"},
        {"email": "miriam.quispe@estudiante.fch.cl"},
        {"email": "miriam.rivera@fch.cl"},
        {"email": "mirko.salazar@fch.cl"},
        {"email": "misabel.berrios@fch.cl"},
        {"email": "misabel.vallejos@fch.cl"},
        {"email": "mjose.delabarra@fch.cl"},
        {"email": "mjose.ramirez@fch.cl"},
        {"email": "mleonor.fuentealba@fch.cl"},
        {"email": "mloreto.saavedra@fch.cl"},
        {"email": "mluisa.jaramillo@fch.cl"},
        {"email": "mobilelab@fch.cl"},
        {"email": "monica.cortes@fch.cl"},
        {"email": "monica.donaire@fch.cl"},
        {"email": "monica.ojeda@fch.cl"},
        {"email": "monserrat.vaca@estudiante.fch.cl"},
        {"email": "montserrat.callis@fch.cl"},
        {"email": "montserrat.hermosilla@estudiante.fch.cl"},
        {"email": "muriel.jutronich@fch.cl"},
        {"email": "mveronica.santander@fch.cl"},
        {"email": "myriam.plaza@fch.cl"},
        {"email": "natalia.bravo@fch.cl"},
        {"email": "natalia.farfan@fch.cl"},
        {"email": "natalia.morales@fch.cl"},
        {"email": "natalia.solis@fch.cl"},
        {"email": "nayi.barriga@fch.cl"},
        {"email": "nelson.garcia@fch.cl"},
        {"email": "nelson.urra@consultor.fch.cl"},
        {"email": "nicolas.alvarez@consultor.fch.cl"},
        {"email": "nicolas.avila@estudiante.fch.cl"},
        {"email": "nicolas.carbone@fch.cl"},
        {"email": "nicolas.macaya@fch.cl"},
        {"email": "nicole.santana@estudiante.fch.cl"},
        {"email": "nicole.valdebenito@fch.cl"},
        {"email": "niklas.daniel@estudiante.fch.cl"},
        {"email": "norma.valdes@fch.cl"},
        {"email": "notificacionsap@fch.cl"},
        {"email": "olaya.cambiaso@fch.cl"},
        {"email": "orfelina.maldonado@fch.cl"},
        {"email": "oscar.canipa@fch.cl"},
        {"email": "pabla.avila@fch.cl"},
        {"email": "pablo.avalos@fch.cl"},
        {"email": "pablo.casanova@fch.cl"},
        {"email": "pablo.fierro@fch.cl"},
        {"email": "pablo.munoz@estudiante.fch.cl"},
        {"email": "pablo.munoz@fch.cl"},
        {"email": "pamela.fuentes@fch.cl"},
        {"email": "pamela.ricke@fch.cl"},
        {"email": "pamela.urzua@fch.cl"},
        {"email": "paola.conte@fch.cl"},
        {"email": "paola.dellorto@fch.cl"},
        {"email": "paola.matus@fch.cl"},
        {"email": "paola.medel@fch.cl"},
        {"email": "paola.narr@fch.cl"},
        {"email": "patricia.mora@consultor.fch.cl"},
        {"email": "patricia.salas@fch.cl"},
        {"email": "patricia.vargas@fch.cl"},
        {"email": "patricio.arriagada@fch.cl"},
        {"email": "patricio.jascura@fch.cl"},
        {"email": "patricio.meller@fch.cl"},
        {"email": "patricio.saez@fch.cl"},
        {"email": "patricio.traslavina@fch.cl"},
        {"email": "paula.arenas@fch.cl"},
        {"email": "paulina.castillo@consultor.fch.cl"},
        {"email": "paulina.concha@fch.cl"},
        {"email": "paulina.cornejo@fch.cl"},
        {"email": "paulina.pena@consultor.fch.cl"},
        {"email": "paulina.rudloff@fch.cl"},
        {"email": "paulina.sazo@fch.cl"},
        {"email": "paz.costagliola@fch.cl"},
        {"email": "paz.fabio@fch.cl"},
        {"email": "percy.alvarado@fch.cl"},
        {"email": "philip.wood@fch.cl"},
        {"email": "pia.leiva@fch.cl"},
        {"email": "pia.morales@fch.cl"},
        {"email": "pilar.stefani@fch.cl"},
        {"email": "pilar.valenzuela@fch.cl"},
        {"email": "pilar.vasquez@fch.cl"},
        {"email": "rafael.aravena@fch.cl"},
        {"email": "rafael.carrasco@fch.cl"},
        {"email": "rafael.diaz@fch.cl"},
        {"email": "rafael.pizarro@fch.cl"},
        {"email": "ramon.vidal@fch.cl"},
        {"email": "raquel.charte@fch.cl"},
        {"email": "raul.vasquez@fch.cl"},
        {"email": "rbascunan@gtnla.cl"},
        {"email": "renate.carriquiry@estudiante.fch.cl"},
        {"email": "ricardo.bascunan.old@gtnla.cl"},
        {"email": "ricardo.morgado@fch.cl"},
        {"email": "rita.mendez@fch.cl"},
        {"email": "roberto.gonzalez@consultor.fch.cl"},
        {"email": "roberto.larraechea@fch.cl"},
        {"email": "robinson.paredes@fch.cl"},
        {"email": "rodrigo.diaz@fch.cl"},
        {"email": "rodrigo.viera@fch.cl"},
        {"email": "romina.monsalve@fch.cl"},
        {"email": "rosa.contreras@fch.cl"},
        {"email": "rosario.navarro@fch.cl"},
        {"email": "rosario.vodanovic@fch.cl"},
        {"email": "rossana.covarrubias@fch.cl"},
        {"email": "roxana.vargas@fch.cl"},
        {"email": "rudy.oyarzo@fch.cl"},
        {"email": "sandra.nunez@fch.cl"},
        {"email": "sandra.oyanedel@fch.cl"},
        {"email": "santiago.sinclair@fch.cl"},
        {"email": "sara.marileo@fch.cl"},
        {"email": "scarlet.urzua@estudiante.fch.cl"},
        {"email": "sebastian.ansaldo@fch.cl"},
        {"email": "sebastian.jara@fch.cl"},
        {"email": "sebastian.jofre@fch.cl"},
        {"email": "sebastian.naour@estudiante.fch.cl"},
        {"email": "sebastian.papi@fch.cl"},
        {"email": "selma.martinez@fch.cl"},
        {"email": "seminario.suziagua@fch.cl"},
        {"email": "sergio.garay@fch.cl"},
        {"email": "sergio.orellana@estudiante.fch.cl"},
        {"email": "servicios.rabat@fch.cl"},
        {"email": "silvia.maldonado@fch.cl"},
        {"email": "silvia.naranjo@fch.cl"},
        {"email": "simon.lobos@fch.cl"},
        {"email": "sofia.grez@fch.cl"},
        {"email": "sofia.matte@estudiante.fch.cl"},
        {"email": "solange.fritz@fch.cl"},
        {"email": "soledad.tirapegui@fch.cl"},
        {"email": "sonia.urzua@fch.cl"},
        {"email": "sophia.abrigo@estudiante.fch.cl"},
        {"email": "stheffany.prado@estudiante.fch.cl"},
        {"email": "susana.burgos@fch.cl"},
        {"email": "susana.gallardo@fch.cl"},
        {"email": "susana.sanhueza@fch.cl"},
        {"email": "tania.correa@fch.cl"},
        {"email": "tania.escobar@fch.cl"},
        {"email": "tania.lopez@fch.cl"},
        {"email": "tania.torres@fch.cl"},
        {"email": "tea.miller@fch.cl"},
        {"email": "terhi.sandberg@estudiante.fch.cl"},
        {"email": "thais.aybar@fch.cl"},
        {"email": "tomas.egana@fch.cl"},
        {"email": "tomas.saiz@fch.cl"},
        {"email": "trinity.leonard@estudiante.fch.cl"},
        {"email": "ulrike.broschek@fch.cl"},
        {"email": "unidadservicios@fch.cl"},
        {"email": "valentina.trisotti@estudiante.fch.cl"},
        {"email": "valeria.gonzalez@fch.cl"},
        {"email": "vanessa.arevalo@fch.cl"},
        {"email": "vania.flores@fch.cl"},
        {"email": "vasty.zamorano@estudiante.fch.cl"},
        {"email": "veronica.diaz@fch.cl"},
        {"email": "veronica.etchegaray@fch.cl"},
        {"email": "veronica.herrera@fch.cl"},
        {"email": "veronica.larenas@fch.cl"},
        {"email": "vhernandez@gtnla.cl"},
        {"email": "vicente.cox.respaldo2@fch.cl"},
        {"email": "vicente.cox.respaldo@fch.cl"},
        {"email": "vicente.cox@fch.cl"},
        {"email": "victor.gonzalez@fch.cl"},
        {"email": "victor.hernandez.old@gtnla.cl"},
        {"email": "victor.illanes@fch.cl"},
        {"email": "victor.pacheco@fch.cl"},
        {"email": "victoria.medina@fch.cl"},
        {"email": "violeta.valencia@fch.cl"},
        {"email": "viviana.casanova@fch.cl"},
        {"email": "viviana.levil@fch.cl"},
        {"email": "viviana.maturana@fch.cl"},
        {"email": "workflowoc@fch.cl"},
        {"email": "yasna.venegas@fch.cl"},
        {"email": "yennifer.figueroa@fch.cl"},
        {"email": "yesenia.hobas@fch.cl"},
        {"email": "yissel.soto@fch.cl"}];
}

/**
 * Overwrite the original prototype to extends REST class
 */
apiAdminPreloadController.prototype = rest;

/**
 * Method for GET requests
 * @returns {Object/Array} mixed JSON objects
 */
apiAdminPreloadController.prototype.get = function() {

    if (this.req.query.action == 'insert') {
        this.insertUser();
    }

    if (this.req.query.action == 'friends') {
        this.allUsersAreFriends();
    }

    if (this.req.query.action == 'duplicate') {
        this.checkDuplicate();
    }

};

apiAdminPreloadController.prototype.checkDuplicate = function() {

    var Profile = require('app/models/profile');
    var self = this;

    Profile.find().select('_id full_name').exec(function(err, aryProfile) {

        var google_name = '';
        var aryName = [];

        for (var x in aryProfile) {
            aryName[aryProfile[x].full_name] = 0;
        }
        
        for(var name in aryName){
            
            for (var x in aryProfile) {
                if(name == aryProfile[x].full_name){
                    aryName[name] = aryName[name]+1;
                }
            }
        }
        
        for(var name in aryName){
            
            if(aryName[name] > 1){
                console.log(name+ ' = '+aryName[name]);
                
                for (var x in aryProfile) {
                    
                    if(aryProfile[x].full_name == name){
                        
                    }
                    
                }
            }
        }
        
        //console.log(aryName);

        self.callback(null, {'status': 'finished'});
    });
};

apiAdminPreloadController.prototype.allUsersAreFriends = function() {
    var Profile = require('app/models/profile');
    var self = this;

    Profile.find().select('_id ref_profile_friend').exec(function(err, aryProfile) {

        var aryProfileId = [];
        var aryProfileData = [];

        for (var x in aryProfile) {
            aryProfileId.push(aryProfile[x]._id);
        }

        for (var x in aryProfileId) {

            var profileId = aryProfileId[x];
            var ref_profile_friend = [];

            for (var y in aryProfileId) {
                if (profileId != aryProfileId[y]) {
                    ref_profile_friend.push(aryProfileId[y]);
                }
            }

            aryProfileData.push({
                '_id': profileId,
                'ref_profile_friend': ref_profile_friend
            });
        }

        var contOk = 0;
        for (var x in aryProfile) {
            var profileUser = aryProfile[x];

            profileUser.total_friend = aryProfileData[x].ref_profile_friend.length;
            profileUser.total_follower = aryProfileData[x].ref_profile_friend.length;
            profileUser.ref_profile_friend = aryProfileData[x].ref_profile_friend;
            profileUser.ref_profile_follower = aryProfileData[x].ref_profile_friend;
            profileUser.save(function(err) {

            });
        }

        self.callback(null, {'status': 'finished'});
    });
};

apiAdminPreloadController.prototype.insertUser = function() {

    if (this.aryUsers.length > 0) {

        var User = require('app/models/user');
        var Wall = require('app/models/wall');
        var Profile = require('app/models/profile');
        var Image = require('app/models/image');
        var fs = require('fs');
        var apiAdminPreload = this;
        var basicUser = this.aryUsers[0];

        var newUser = new User();

        var google_name = basicUser.email.split('@')[0];
        var google_first_name = basicUser.email.split('.')[0];
        var google_last_name = basicUser.email.split('.')[1].split('@')[0];
        var avatar = '/upload/avatar/' + google_name + '.JPG';

        if (!fs.existsSync('public' + avatar)) {
            avatar = 'http://placehold.it/416x640';
        }

        console.log('\n');
        console.log(google_name);
        console.log(avatar);

        newUser.google_id = '';//fakeUser.google_id;
        newUser.google_token = '';//fakeUser.google_token;
        newUser.google_name = google_name;//fakeUser.google_name;
        newUser.google_first_name = google_first_name;//fakeUser.google_first_name;
        newUser.google_last_name = google_last_name;//fakeUser.google_last_name;
        newUser.google_hd = 'FCh';//fakeUser.google_hd;
        newUser.google_email = basicUser.email;
        newUser.google_img = avatar;

        newUser.save(function(err) {
            if (err)
                return done(err);

            var image = new Image();
            image.image_original = newUser.google_img;
            image.save(function(err, image) {

                var profile = new Profile();
                profile.position = newUser.google_hd;
                profile.first_name = newUser.google_first_name;
                profile.last_name = newUser.google_last_name;
                profile.full_name = newUser.google_name;
                profile.ref_user = newUser._id;
                profile.ref_image = image._id;
                profile.save(function() {

                    var wall = new Wall();
                    wall.ref_user = newUser._id;
                    wall.ref_profile = profile._id;
                    wall.save(function() {
                        profile.ref_wall = wall._id;
                        profile.save(function() {
                            apiAdminPreload.aryUsers.shift();
                            apiAdminPreload.insertUser();
                        });
                    });
                });
            });
        });
    } else {
        this.callback(null, {'status': 'finished'});
    }
};

/**
 * Module exports
 */
module.exports = new apiAdminPreloadController();