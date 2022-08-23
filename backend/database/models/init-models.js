var DataTypes = require("sequelize").DataTypes;
var _swapplogdata = require("./swapplogdata");
var _swapplogs = require("./swapplogs");
var _swattachmentchunks = require("./swattachmentchunks");
var _swattachments = require("./swattachments");
var _swautoclosecriteria = require("./swautoclosecriteria");
var _swautocloserules = require("./swautocloserules");
var _swbayescategories = require("./swbayescategories");
var _swbayeswords = require("./swbayeswords");
var _swbayeswordsfreqs = require("./swbayeswordsfreqs");
var _swbreaklines = require("./swbreaklines");
var _swcalls = require("./swcalls");
var _swcannedcategories = require("./swcannedcategories");
var _swcannedresponsedata = require("./swcannedresponsedata");
var _swcannedresponses = require("./swcannedresponses");
var _swcatchallrules = require("./swcatchallrules");
var _swchatchilds = require("./swchatchilds");
var _swchatdata = require("./swchatdata");
var _swchathits = require("./swchathits");
var _swchatobjects = require("./swchatobjects");
var _swchatskilllinks = require("./swchatskilllinks");
var _swchatskills = require("./swchatskills");
var _swchattextdata = require("./swchattextdata");
var _swchatvariables = require("./swchatvariables");
var _swcommentdata = require("./swcommentdata");
var _swcomments = require("./swcomments");
var _swcron = require("./swcron");
var _swcronlogs = require("./swcronlogs");
var _swcustomfielddeplinks = require("./swcustomfielddeplinks");
var _swcustomfieldgrouppermissions = require("./swcustomfieldgrouppermissions");
var _swcustomfieldgroups = require("./swcustomfieldgroups");
var _swcustomfieldlinks = require("./swcustomfieldlinks");
var _swcustomfieldoptionlinks = require("./swcustomfieldoptionlinks");
var _swcustomfieldoptions = require("./swcustomfieldoptions");
var _swcustomfields = require("./swcustomfields");
var _swcustomfieldvalues = require("./swcustomfieldvalues");
var _swdepartments = require("./swdepartments");
var _swemailqueues = require("./swemailqueues");
var _swerrorlogs = require("./swerrorlogs");
var _swescalationnotifications = require("./swescalationnotifications");
var _swescalationpaths = require("./swescalationpaths");
var _swescalationrules = require("./swescalationrules");
var _swfiles = require("./swfiles");
var _swgeoipcities = require("./swgeoipcities");
var _swgeoipcityblocks1 = require("./swgeoipcityblocks1");
var _swgeoipcityblocks10 = require("./swgeoipcityblocks10");
var _swgeoipcityblocks2 = require("./swgeoipcityblocks2");
var _swgeoipcityblocks3 = require("./swgeoipcityblocks3");
var _swgeoipcityblocks4 = require("./swgeoipcityblocks4");
var _swgeoipcityblocks5 = require("./swgeoipcityblocks5");
var _swgeoipcityblocks6 = require("./swgeoipcityblocks6");
var _swgeoipcityblocks7 = require("./swgeoipcityblocks7");
var _swgeoipcityblocks8 = require("./swgeoipcityblocks8");
var _swgeoipcityblocks9 = require("./swgeoipcityblocks9");
var _swgeoipisp1 = require("./swgeoipisp1");
var _swgeoipisp10 = require("./swgeoipisp10");
var _swgeoipisp2 = require("./swgeoipisp2");
var _swgeoipisp3 = require("./swgeoipisp3");
var _swgeoipisp4 = require("./swgeoipisp4");
var _swgeoipisp5 = require("./swgeoipisp5");
var _swgeoipisp6 = require("./swgeoipisp6");
var _swgeoipisp7 = require("./swgeoipisp7");
var _swgeoipisp8 = require("./swgeoipisp8");
var _swgeoipisp9 = require("./swgeoipisp9");
var _swgeoipnetspeed1 = require("./swgeoipnetspeed1");
var _swgeoipnetspeed10 = require("./swgeoipnetspeed10");
var _swgeoipnetspeed2 = require("./swgeoipnetspeed2");
var _swgeoipnetspeed3 = require("./swgeoipnetspeed3");
var _swgeoipnetspeed4 = require("./swgeoipnetspeed4");
var _swgeoipnetspeed5 = require("./swgeoipnetspeed5");
var _swgeoipnetspeed6 = require("./swgeoipnetspeed6");
var _swgeoipnetspeed7 = require("./swgeoipnetspeed7");
var _swgeoipnetspeed8 = require("./swgeoipnetspeed8");
var _swgeoipnetspeed9 = require("./swgeoipnetspeed9");
var _swgeoiporganization1 = require("./swgeoiporganization1");
var _swgeoiporganization10 = require("./swgeoiporganization10");
var _swgeoiporganization2 = require("./swgeoiporganization2");
var _swgeoiporganization3 = require("./swgeoiporganization3");
var _swgeoiporganization4 = require("./swgeoiporganization4");
var _swgeoiporganization5 = require("./swgeoiporganization5");
var _swgeoiporganization6 = require("./swgeoiporganization6");
var _swgeoiporganization7 = require("./swgeoiporganization7");
var _swgeoiporganization8 = require("./swgeoiporganization8");
var _swgeoiporganization9 = require("./swgeoiporganization9");
var _swgroupassigns = require("./swgroupassigns");
var _swimportlogs = require("./swimportlogs");
var _swimportregistry = require("./swimportregistry");
var _swjabberqueue = require("./swjabberqueue");
var _swjiraissues = require("./swjiraissues");
var _swjobqueuemessagelogs = require("./swjobqueuemessagelogs");
var _swjobqueuemessagepackets = require("./swjobqueuemessagepackets");
var _swjobqueuemessages = require("./swjobqueuemessages");
var _swkbarticledata = require("./swkbarticledata");
var _swkbarticlelinks = require("./swkbarticlelinks");
var _swkbarticles = require("./swkbarticles");
var _swkbarticlesubscribers = require("./swkbarticlesubscribers");
var _swkbcategories = require("./swkbcategories");
var _swlanguagephrases = require("./swlanguagephrases");
var _swlanguages = require("./swlanguages");
var _swmacrocategories = require("./swmacrocategories");
var _swmacroreplies = require("./swmacroreplies");
var _swmacroreplydata = require("./swmacroreplydata");
var _swmailqueuedata = require("./swmailqueuedata");
var _swmessagedata = require("./swmessagedata");
var _swmessagequeue = require("./swmessagequeue");
var _swmessagerouting = require("./swmessagerouting");
var _swmessages = require("./swmessages");
var _swnewscategories = require("./swnewscategories");
var _swnewscategorylinks = require("./swnewscategorylinks");
var _swnewsitemdata = require("./swnewsitemdata");
var _swnewsitems = require("./swnewsitems");
var _swnewssubscriberhash = require("./swnewssubscriberhash");
var _swnewssubscribers = require("./swnewssubscribers");
var _swnotificationactions = require("./swnotificationactions");
var _swnotificationcriteria = require("./swnotificationcriteria");
var _swnotificationpool = require("./swnotificationpool");
var _swnotificationrules = require("./swnotificationrules");
var _swonsitesessions = require("./swonsitesessions");
var _swparserbans = require("./swparserbans");
var _swparserlogdata = require("./swparserlogdata");
var _swparserlogs = require("./swparserlogs");
var _swparserloopblocks = require("./swparserloopblocks");
var _swparserloophits = require("./swparserloophits");
var _swparserlooprules = require("./swparserlooprules");
var _swparserruleactions = require("./swparserruleactions");
var _swparserrulecriteria = require("./swparserrulecriteria");
var _swparserrules = require("./swparserrules");
var _swqueuesignatures = require("./swqueuesignatures");
var _swratingresults = require("./swratingresults");
var _swratings = require("./swratings");
var _swregistry = require("./swregistry");
var _swreportcategories = require("./swreportcategories");
var _swreporthistory = require("./swreporthistory");
var _swreports = require("./swreports");
var _swreportschedules = require("./swreportschedules");
var _swreportusagelogs = require("./swreportusagelogs");
var _swsearchindex = require("./swsearchindex");
var _swsearchstoredata = require("./swsearchstoredata");
var _swsearchstores = require("./swsearchstores");
var _swsessions = require("./swsessions");
var _swsettings = require("./swsettings");
var _swsettingsfields = require("./swsettingsfields");
var _swsettingsgroups = require("./swsettingsgroups");
var _swsignatures = require("./swsignatures");
var _swslaholidaylinks = require("./swslaholidaylinks");
var _swslaholidays = require("./swslaholidays");
var _swslaplans = require("./swslaplans");
var _swslarulecriteria = require("./swslarulecriteria");
var _swslaschedules = require("./swslaschedules");
var _swslascheduletable = require("./swslascheduletable");
var _swstaff = require("./swstaff");
var _swstaffactivitylog = require("./swstaffactivitylog");
var _swstaffassigns = require("./swstaffassigns");
var _swstaffgroup = require("./swstaffgroup");
var _swstaffgrouplinks = require("./swstaffgrouplinks");
var _swstaffgroupsettings = require("./swstaffgroupsettings");
var _swstaffloginlog = require("./swstaffloginlog");
var _swstaffprofileimages = require("./swstaffprofileimages");
var _swstaffproperties = require("./swstaffproperties");
var _swstaffsettings = require("./swstaffsettings");
var _swtaglinks = require("./swtaglinks");
var _swtags = require("./swtags");
var _swtemplatecategories = require("./swtemplatecategories");
var _swtemplatedata = require("./swtemplatedata");
var _swtemplategroups = require("./swtemplategroups");
var _swtemplatehistory = require("./swtemplatehistory");
var _swtemplates = require("./swtemplates");
var _swticketauditlogs = require("./swticketauditlogs");
var _swticketdrafts = require("./swticketdrafts");
var _swticketemails = require("./swticketemails");
var _swticketfiletypes = require("./swticketfiletypes");
var _swticketfilterfields = require("./swticketfilterfields");
var _swticketfilters = require("./swticketfilters");
var _swticketfollowups = require("./swticketfollowups");
var _swticketlinkchains = require("./swticketlinkchains");
var _swticketlinkedtables = require("./swticketlinkedtables");
var _swticketlinktypes = require("./swticketlinktypes");
var _swticketlocks = require("./swticketlocks");
var _swticketmergelog = require("./swticketmergelog");
var _swticketmessageids = require("./swticketmessageids");
var _swticketnotes = require("./swticketnotes");
var _swticketpostlocks = require("./swticketpostlocks");
var _swticketposts = require("./swticketposts");
var _swticketpriorities = require("./swticketpriorities");
var _swticketrecipients = require("./swticketrecipients");
var _swticketrecurrences = require("./swticketrecurrences");
var _swtickets = require("./swtickets");
var _swticketstatus = require("./swticketstatus");
var _swtickettimetracknotes = require("./swtickettimetracknotes");
var _swtickettimetracks = require("./swtickettimetracks");
var _swtickettypes = require("./swtickettypes");
var _swticketviewfields = require("./swticketviewfields");
var _swticketviewlinks = require("./swticketviewlinks");
var _swticketviews = require("./swticketviews");
var _swticketwatchers = require("./swticketwatchers");
var _swticketworkflowactions = require("./swticketworkflowactions");
var _swticketworkflowcriteria = require("./swticketworkflowcriteria");
var _swticketworkflownotifications = require("./swticketworkflownotifications");
var _swticketworkflows = require("./swticketworkflows");
var _swtroubleshootercategories = require("./swtroubleshootercategories");
var _swtroubleshooterdata = require("./swtroubleshooterdata");
var _swtroubleshooterlinks = require("./swtroubleshooterlinks");
var _swtroubleshootersteps = require("./swtroubleshootersteps");
var _swuseremails = require("./swuseremails");
var _swusergroupassigns = require("./swusergroupassigns");
var _swusergroups = require("./swusergroups");
var _swusergroupsettings = require("./swusergroupsettings");
var _swuserloginlog = require("./swuserloginlog");
var _swusernotedata = require("./swusernotedata");
var _swusernotes = require("./swusernotes");
var _swuserorganizations = require("./swuserorganizations");
var _swuserprofileimages = require("./swuserprofileimages");
var _swuserproperties = require("./swuserproperties");
var _swusers = require("./swusers");
var _swusersettings = require("./swusersettings");
var _swuserverifyhash = require("./swuserverifyhash");
var _swvisitorbans = require("./swvisitorbans");
var _swvisitordata = require("./swvisitordata");
var _swvisitorfootprints = require("./swvisitorfootprints");
var _swvisitorgroups = require("./swvisitorgroups");
var _swvisitornotedata = require("./swvisitornotedata");
var _swvisitornotes = require("./swvisitornotes");
var _swvisitorpulls = require("./swvisitorpulls");
var _swvisitorpulls2 = require("./swvisitorpulls2");
var _swvisitorruleactions = require("./swvisitorruleactions");
var _swvisitorrulecriteria = require("./swvisitorrulecriteria");
var _swvisitorrules = require("./swvisitorrules");
var _swwidgets = require("./swwidgets");
var _tokens = require("./tokens");

function initModels(sequelize) {
  var swapplogdata = _swapplogdata(sequelize, DataTypes);
  var swapplogs = _swapplogs(sequelize, DataTypes);
  var swattachmentchunks = _swattachmentchunks(sequelize, DataTypes);
  var swattachments = _swattachments(sequelize, DataTypes);
  var swautoclosecriteria = _swautoclosecriteria(sequelize, DataTypes);
  var swautocloserules = _swautocloserules(sequelize, DataTypes);
  var swbayescategories = _swbayescategories(sequelize, DataTypes);
  var swbayeswords = _swbayeswords(sequelize, DataTypes);
  var swbayeswordsfreqs = _swbayeswordsfreqs(sequelize, DataTypes);
  var swbreaklines = _swbreaklines(sequelize, DataTypes);
  var swcalls = _swcalls(sequelize, DataTypes);
  var swcannedcategories = _swcannedcategories(sequelize, DataTypes);
  var swcannedresponsedata = _swcannedresponsedata(sequelize, DataTypes);
  var swcannedresponses = _swcannedresponses(sequelize, DataTypes);
  var swcatchallrules = _swcatchallrules(sequelize, DataTypes);
  var swchatchilds = _swchatchilds(sequelize, DataTypes);
  var swchatdata = _swchatdata(sequelize, DataTypes);
  var swchathits = _swchathits(sequelize, DataTypes);
  var swchatobjects = _swchatobjects(sequelize, DataTypes);
  var swchatskilllinks = _swchatskilllinks(sequelize, DataTypes);
  var swchatskills = _swchatskills(sequelize, DataTypes);
  var swchattextdata = _swchattextdata(sequelize, DataTypes);
  var swchatvariables = _swchatvariables(sequelize, DataTypes);
  var swcommentdata = _swcommentdata(sequelize, DataTypes);
  var swcomments = _swcomments(sequelize, DataTypes);
  var swcron = _swcron(sequelize, DataTypes);
  var swcronlogs = _swcronlogs(sequelize, DataTypes);
  var swcustomfielddeplinks = _swcustomfielddeplinks(sequelize, DataTypes);
  var swcustomfieldgrouppermissions = _swcustomfieldgrouppermissions(sequelize, DataTypes);
  var swcustomfieldgroups = _swcustomfieldgroups(sequelize, DataTypes);
  var swcustomfieldlinks = _swcustomfieldlinks(sequelize, DataTypes);
  var swcustomfieldoptionlinks = _swcustomfieldoptionlinks(sequelize, DataTypes);
  var swcustomfieldoptions = _swcustomfieldoptions(sequelize, DataTypes);
  var swcustomfields = _swcustomfields(sequelize, DataTypes);
  var swcustomfieldvalues = _swcustomfieldvalues(sequelize, DataTypes);
  var swdepartments = _swdepartments(sequelize, DataTypes);
  var swemailqueues = _swemailqueues(sequelize, DataTypes);
  var swerrorlogs = _swerrorlogs(sequelize, DataTypes);
  var swescalationnotifications = _swescalationnotifications(sequelize, DataTypes);
  var swescalationpaths = _swescalationpaths(sequelize, DataTypes);
  var swescalationrules = _swescalationrules(sequelize, DataTypes);
  var swfiles = _swfiles(sequelize, DataTypes);
  var swgeoipcities = _swgeoipcities(sequelize, DataTypes);
  var swgeoipcityblocks1 = _swgeoipcityblocks1(sequelize, DataTypes);
  var swgeoipcityblocks10 = _swgeoipcityblocks10(sequelize, DataTypes);
  var swgeoipcityblocks2 = _swgeoipcityblocks2(sequelize, DataTypes);
  var swgeoipcityblocks3 = _swgeoipcityblocks3(sequelize, DataTypes);
  var swgeoipcityblocks4 = _swgeoipcityblocks4(sequelize, DataTypes);
  var swgeoipcityblocks5 = _swgeoipcityblocks5(sequelize, DataTypes);
  var swgeoipcityblocks6 = _swgeoipcityblocks6(sequelize, DataTypes);
  var swgeoipcityblocks7 = _swgeoipcityblocks7(sequelize, DataTypes);
  var swgeoipcityblocks8 = _swgeoipcityblocks8(sequelize, DataTypes);
  var swgeoipcityblocks9 = _swgeoipcityblocks9(sequelize, DataTypes);
  var swgeoipisp1 = _swgeoipisp1(sequelize, DataTypes);
  var swgeoipisp10 = _swgeoipisp10(sequelize, DataTypes);
  var swgeoipisp2 = _swgeoipisp2(sequelize, DataTypes);
  var swgeoipisp3 = _swgeoipisp3(sequelize, DataTypes);
  var swgeoipisp4 = _swgeoipisp4(sequelize, DataTypes);
  var swgeoipisp5 = _swgeoipisp5(sequelize, DataTypes);
  var swgeoipisp6 = _swgeoipisp6(sequelize, DataTypes);
  var swgeoipisp7 = _swgeoipisp7(sequelize, DataTypes);
  var swgeoipisp8 = _swgeoipisp8(sequelize, DataTypes);
  var swgeoipisp9 = _swgeoipisp9(sequelize, DataTypes);
  var swgeoipnetspeed1 = _swgeoipnetspeed1(sequelize, DataTypes);
  var swgeoipnetspeed10 = _swgeoipnetspeed10(sequelize, DataTypes);
  var swgeoipnetspeed2 = _swgeoipnetspeed2(sequelize, DataTypes);
  var swgeoipnetspeed3 = _swgeoipnetspeed3(sequelize, DataTypes);
  var swgeoipnetspeed4 = _swgeoipnetspeed4(sequelize, DataTypes);
  var swgeoipnetspeed5 = _swgeoipnetspeed5(sequelize, DataTypes);
  var swgeoipnetspeed6 = _swgeoipnetspeed6(sequelize, DataTypes);
  var swgeoipnetspeed7 = _swgeoipnetspeed7(sequelize, DataTypes);
  var swgeoipnetspeed8 = _swgeoipnetspeed8(sequelize, DataTypes);
  var swgeoipnetspeed9 = _swgeoipnetspeed9(sequelize, DataTypes);
  var swgeoiporganization1 = _swgeoiporganization1(sequelize, DataTypes);
  var swgeoiporganization10 = _swgeoiporganization10(sequelize, DataTypes);
  var swgeoiporganization2 = _swgeoiporganization2(sequelize, DataTypes);
  var swgeoiporganization3 = _swgeoiporganization3(sequelize, DataTypes);
  var swgeoiporganization4 = _swgeoiporganization4(sequelize, DataTypes);
  var swgeoiporganization5 = _swgeoiporganization5(sequelize, DataTypes);
  var swgeoiporganization6 = _swgeoiporganization6(sequelize, DataTypes);
  var swgeoiporganization7 = _swgeoiporganization7(sequelize, DataTypes);
  var swgeoiporganization8 = _swgeoiporganization8(sequelize, DataTypes);
  var swgeoiporganization9 = _swgeoiporganization9(sequelize, DataTypes);
  var swgroupassigns = _swgroupassigns(sequelize, DataTypes);
  var swimportlogs = _swimportlogs(sequelize, DataTypes);
  var swimportregistry = _swimportregistry(sequelize, DataTypes);
  var swjabberqueue = _swjabberqueue(sequelize, DataTypes);
  var swjiraissues = _swjiraissues(sequelize, DataTypes);
  var swjobqueuemessagelogs = _swjobqueuemessagelogs(sequelize, DataTypes);
  var swjobqueuemessagepackets = _swjobqueuemessagepackets(sequelize, DataTypes);
  var swjobqueuemessages = _swjobqueuemessages(sequelize, DataTypes);
  var swkbarticledata = _swkbarticledata(sequelize, DataTypes);
  var swkbarticlelinks = _swkbarticlelinks(sequelize, DataTypes);
  var swkbarticles = _swkbarticles(sequelize, DataTypes);
  var swkbarticlesubscribers = _swkbarticlesubscribers(sequelize, DataTypes);
  var swkbcategories = _swkbcategories(sequelize, DataTypes);
  var swlanguagephrases = _swlanguagephrases(sequelize, DataTypes);
  var swlanguages = _swlanguages(sequelize, DataTypes);
  var swmacrocategories = _swmacrocategories(sequelize, DataTypes);
  var swmacroreplies = _swmacroreplies(sequelize, DataTypes);
  var swmacroreplydata = _swmacroreplydata(sequelize, DataTypes);
  var swmailqueuedata = _swmailqueuedata(sequelize, DataTypes);
  var swmessagedata = _swmessagedata(sequelize, DataTypes);
  var swmessagequeue = _swmessagequeue(sequelize, DataTypes);
  var swmessagerouting = _swmessagerouting(sequelize, DataTypes);
  var swmessages = _swmessages(sequelize, DataTypes);
  var swnewscategories = _swnewscategories(sequelize, DataTypes);
  var swnewscategorylinks = _swnewscategorylinks(sequelize, DataTypes);
  var swnewsitemdata = _swnewsitemdata(sequelize, DataTypes);
  var swnewsitems = _swnewsitems(sequelize, DataTypes);
  var swnewssubscriberhash = _swnewssubscriberhash(sequelize, DataTypes);
  var swnewssubscribers = _swnewssubscribers(sequelize, DataTypes);
  var swnotificationactions = _swnotificationactions(sequelize, DataTypes);
  var swnotificationcriteria = _swnotificationcriteria(sequelize, DataTypes);
  var swnotificationpool = _swnotificationpool(sequelize, DataTypes);
  var swnotificationrules = _swnotificationrules(sequelize, DataTypes);
  var swonsitesessions = _swonsitesessions(sequelize, DataTypes);
  var swparserbans = _swparserbans(sequelize, DataTypes);
  var swparserlogdata = _swparserlogdata(sequelize, DataTypes);
  var swparserlogs = _swparserlogs(sequelize, DataTypes);
  var swparserloopblocks = _swparserloopblocks(sequelize, DataTypes);
  var swparserloophits = _swparserloophits(sequelize, DataTypes);
  var swparserlooprules = _swparserlooprules(sequelize, DataTypes);
  var swparserruleactions = _swparserruleactions(sequelize, DataTypes);
  var swparserrulecriteria = _swparserrulecriteria(sequelize, DataTypes);
  var swparserrules = _swparserrules(sequelize, DataTypes);
  var swqueuesignatures = _swqueuesignatures(sequelize, DataTypes);
  var swratingresults = _swratingresults(sequelize, DataTypes);
  var swratings = _swratings(sequelize, DataTypes);
  var swregistry = _swregistry(sequelize, DataTypes);
  var swreportcategories = _swreportcategories(sequelize, DataTypes);
  var swreporthistory = _swreporthistory(sequelize, DataTypes);
  var swreports = _swreports(sequelize, DataTypes);
  var swreportschedules = _swreportschedules(sequelize, DataTypes);
  var swreportusagelogs = _swreportusagelogs(sequelize, DataTypes);
  var swsearchindex = _swsearchindex(sequelize, DataTypes);
  var swsearchstoredata = _swsearchstoredata(sequelize, DataTypes);
  var swsearchstores = _swsearchstores(sequelize, DataTypes);
  var swsessions = _swsessions(sequelize, DataTypes);
  var swsettings = _swsettings(sequelize, DataTypes);
  var swsettingsfields = _swsettingsfields(sequelize, DataTypes);
  var swsettingsgroups = _swsettingsgroups(sequelize, DataTypes);
  var swsignatures = _swsignatures(sequelize, DataTypes);
  var swslaholidaylinks = _swslaholidaylinks(sequelize, DataTypes);
  var swslaholidays = _swslaholidays(sequelize, DataTypes);
  var swslaplans = _swslaplans(sequelize, DataTypes);
  var swslarulecriteria = _swslarulecriteria(sequelize, DataTypes);
  var swslaschedules = _swslaschedules(sequelize, DataTypes);
  var swslascheduletable = _swslascheduletable(sequelize, DataTypes);
  var swstaff = _swstaff(sequelize, DataTypes);
  var swstaffactivitylog = _swstaffactivitylog(sequelize, DataTypes);
  var swstaffassigns = _swstaffassigns(sequelize, DataTypes);
  var swstaffgroup = _swstaffgroup(sequelize, DataTypes);
  var swstaffgrouplinks = _swstaffgrouplinks(sequelize, DataTypes);
  var swstaffgroupsettings = _swstaffgroupsettings(sequelize, DataTypes);
  var swstaffloginlog = _swstaffloginlog(sequelize, DataTypes);
  var swstaffprofileimages = _swstaffprofileimages(sequelize, DataTypes);
  var swstaffproperties = _swstaffproperties(sequelize, DataTypes);
  var swstaffsettings = _swstaffsettings(sequelize, DataTypes);
  var swtaglinks = _swtaglinks(sequelize, DataTypes);
  var swtags = _swtags(sequelize, DataTypes);
  var swtemplatecategories = _swtemplatecategories(sequelize, DataTypes);
  var swtemplatedata = _swtemplatedata(sequelize, DataTypes);
  var swtemplategroups = _swtemplategroups(sequelize, DataTypes);
  var swtemplatehistory = _swtemplatehistory(sequelize, DataTypes);
  var swtemplates = _swtemplates(sequelize, DataTypes);
  var swticketauditlogs = _swticketauditlogs(sequelize, DataTypes);
  var swticketdrafts = _swticketdrafts(sequelize, DataTypes);
  var swticketemails = _swticketemails(sequelize, DataTypes);
  var swticketfiletypes = _swticketfiletypes(sequelize, DataTypes);
  var swticketfilterfields = _swticketfilterfields(sequelize, DataTypes);
  var swticketfilters = _swticketfilters(sequelize, DataTypes);
  var swticketfollowups = _swticketfollowups(sequelize, DataTypes);
  var swticketlinkchains = _swticketlinkchains(sequelize, DataTypes);
  var swticketlinkedtables = _swticketlinkedtables(sequelize, DataTypes);
  var swticketlinktypes = _swticketlinktypes(sequelize, DataTypes);
  var swticketlocks = _swticketlocks(sequelize, DataTypes);
  var swticketmergelog = _swticketmergelog(sequelize, DataTypes);
  var swticketmessageids = _swticketmessageids(sequelize, DataTypes);
  var swticketnotes = _swticketnotes(sequelize, DataTypes);
  var swticketpostlocks = _swticketpostlocks(sequelize, DataTypes);
  var swticketposts = _swticketposts(sequelize, DataTypes);
  var swticketpriorities = _swticketpriorities(sequelize, DataTypes);
  var swticketrecipients = _swticketrecipients(sequelize, DataTypes);
  var swticketrecurrences = _swticketrecurrences(sequelize, DataTypes);
  var swtickets = _swtickets(sequelize, DataTypes);
  var swticketstatus = _swticketstatus(sequelize, DataTypes);
  var swtickettimetracknotes = _swtickettimetracknotes(sequelize, DataTypes);
  var swtickettimetracks = _swtickettimetracks(sequelize, DataTypes);
  var swtickettypes = _swtickettypes(sequelize, DataTypes);
  var swticketviewfields = _swticketviewfields(sequelize, DataTypes);
  var swticketviewlinks = _swticketviewlinks(sequelize, DataTypes);
  var swticketviews = _swticketviews(sequelize, DataTypes);
  var swticketwatchers = _swticketwatchers(sequelize, DataTypes);
  var swticketworkflowactions = _swticketworkflowactions(sequelize, DataTypes);
  var swticketworkflowcriteria = _swticketworkflowcriteria(sequelize, DataTypes);
  var swticketworkflownotifications = _swticketworkflownotifications(sequelize, DataTypes);
  var swticketworkflows = _swticketworkflows(sequelize, DataTypes);
  var swtroubleshootercategories = _swtroubleshootercategories(sequelize, DataTypes);
  var swtroubleshooterdata = _swtroubleshooterdata(sequelize, DataTypes);
  var swtroubleshooterlinks = _swtroubleshooterlinks(sequelize, DataTypes);
  var swtroubleshootersteps = _swtroubleshootersteps(sequelize, DataTypes);
  var swuseremails = _swuseremails(sequelize, DataTypes);
  var swusergroupassigns = _swusergroupassigns(sequelize, DataTypes);
  var swusergroups = _swusergroups(sequelize, DataTypes);
  var swusergroupsettings = _swusergroupsettings(sequelize, DataTypes);
  var swuserloginlog = _swuserloginlog(sequelize, DataTypes);
  var swusernotedata = _swusernotedata(sequelize, DataTypes);
  var swusernotes = _swusernotes(sequelize, DataTypes);
  var swuserorganizations = _swuserorganizations(sequelize, DataTypes);
  var swuserprofileimages = _swuserprofileimages(sequelize, DataTypes);
  var swuserproperties = _swuserproperties(sequelize, DataTypes);
  var swusers = _swusers(sequelize, DataTypes);
  var swusersettings = _swusersettings(sequelize, DataTypes);
  var swuserverifyhash = _swuserverifyhash(sequelize, DataTypes);
  var swvisitorbans = _swvisitorbans(sequelize, DataTypes);
  var swvisitordata = _swvisitordata(sequelize, DataTypes);
  var swvisitorfootprints = _swvisitorfootprints(sequelize, DataTypes);
  var swvisitorgroups = _swvisitorgroups(sequelize, DataTypes);
  var swvisitornotedata = _swvisitornotedata(sequelize, DataTypes);
  var swvisitornotes = _swvisitornotes(sequelize, DataTypes);
  var swvisitorpulls = _swvisitorpulls(sequelize, DataTypes);
  var swvisitorpulls2 = _swvisitorpulls2(sequelize, DataTypes);
  var swvisitorruleactions = _swvisitorruleactions(sequelize, DataTypes);
  var swvisitorrulecriteria = _swvisitorrulecriteria(sequelize, DataTypes);
  var swvisitorrules = _swvisitorrules(sequelize, DataTypes);
  var swwidgets = _swwidgets(sequelize, DataTypes);
  var tokens = _tokens(sequelize, DataTypes);

  tokens.belongsTo(swusers, { as: "user", foreignKey: "userId"});

  return {
    swapplogdata,
    swapplogs,
    swattachmentchunks,
    swattachments,
    swautoclosecriteria,
    swautocloserules,
    swbayescategories,
    swbayeswords,
    swbayeswordsfreqs,
    swbreaklines,
    swcalls,
    swcannedcategories,
    swcannedresponsedata,
    swcannedresponses,
    swcatchallrules,
    swchatchilds,
    swchatdata,
    swchathits,
    swchatobjects,
    swchatskilllinks,
    swchatskills,
    swchattextdata,
    swchatvariables,
    swcommentdata,
    swcomments,
    swcron,
    swcronlogs,
    swcustomfielddeplinks,
    swcustomfieldgrouppermissions,
    swcustomfieldgroups,
    swcustomfieldlinks,
    swcustomfieldoptionlinks,
    swcustomfieldoptions,
    swcustomfields,
    swcustomfieldvalues,
    swdepartments,
    swemailqueues,
    swerrorlogs,
    swescalationnotifications,
    swescalationpaths,
    swescalationrules,
    swfiles,
    swgeoipcities,
    swgeoipcityblocks1,
    swgeoipcityblocks10,
    swgeoipcityblocks2,
    swgeoipcityblocks3,
    swgeoipcityblocks4,
    swgeoipcityblocks5,
    swgeoipcityblocks6,
    swgeoipcityblocks7,
    swgeoipcityblocks8,
    swgeoipcityblocks9,
    swgeoipisp1,
    swgeoipisp10,
    swgeoipisp2,
    swgeoipisp3,
    swgeoipisp4,
    swgeoipisp5,
    swgeoipisp6,
    swgeoipisp7,
    swgeoipisp8,
    swgeoipisp9,
    swgeoipnetspeed1,
    swgeoipnetspeed10,
    swgeoipnetspeed2,
    swgeoipnetspeed3,
    swgeoipnetspeed4,
    swgeoipnetspeed5,
    swgeoipnetspeed6,
    swgeoipnetspeed7,
    swgeoipnetspeed8,
    swgeoipnetspeed9,
    swgeoiporganization1,
    swgeoiporganization10,
    swgeoiporganization2,
    swgeoiporganization3,
    swgeoiporganization4,
    swgeoiporganization5,
    swgeoiporganization6,
    swgeoiporganization7,
    swgeoiporganization8,
    swgeoiporganization9,
    swgroupassigns,
    swimportlogs,
    swimportregistry,
    swjabberqueue,
    swjiraissues,
    swjobqueuemessagelogs,
    swjobqueuemessagepackets,
    swjobqueuemessages,
    swkbarticledata,
    swkbarticlelinks,
    swkbarticles,
    swkbarticlesubscribers,
    swkbcategories,
    swlanguagephrases,
    swlanguages,
    swmacrocategories,
    swmacroreplies,
    swmacroreplydata,
    swmailqueuedata,
    swmessagedata,
    swmessagequeue,
    swmessagerouting,
    swmessages,
    swnewscategories,
    swnewscategorylinks,
    swnewsitemdata,
    swnewsitems,
    swnewssubscriberhash,
    swnewssubscribers,
    swnotificationactions,
    swnotificationcriteria,
    swnotificationpool,
    swnotificationrules,
    swonsitesessions,
    swparserbans,
    swparserlogdata,
    swparserlogs,
    swparserloopblocks,
    swparserloophits,
    swparserlooprules,
    swparserruleactions,
    swparserrulecriteria,
    swparserrules,
    swqueuesignatures,
    swratingresults,
    swratings,
    swregistry,
    swreportcategories,
    swreporthistory,
    swreports,
    swreportschedules,
    swreportusagelogs,
    swsearchindex,
    swsearchstoredata,
    swsearchstores,
    swsessions,
    swsettings,
    swsettingsfields,
    swsettingsgroups,
    swsignatures,
    swslaholidaylinks,
    swslaholidays,
    swslaplans,
    swslarulecriteria,
    swslaschedules,
    swslascheduletable,
    swstaff,
    swstaffactivitylog,
    swstaffassigns,
    swstaffgroup,
    swstaffgrouplinks,
    swstaffgroupsettings,
    swstaffloginlog,
    swstaffprofileimages,
    swstaffproperties,
    swstaffsettings,
    swtaglinks,
    swtags,
    swtemplatecategories,
    swtemplatedata,
    swtemplategroups,
    swtemplatehistory,
    swtemplates,
    swticketauditlogs,
    swticketdrafts,
    swticketemails,
    swticketfiletypes,
    swticketfilterfields,
    swticketfilters,
    swticketfollowups,
    swticketlinkchains,
    swticketlinkedtables,
    swticketlinktypes,
    swticketlocks,
    swticketmergelog,
    swticketmessageids,
    swticketnotes,
    swticketpostlocks,
    swticketposts,
    swticketpriorities,
    swticketrecipients,
    swticketrecurrences,
    swtickets,
    swticketstatus,
    swtickettimetracknotes,
    swtickettimetracks,
    swtickettypes,
    swticketviewfields,
    swticketviewlinks,
    swticketviews,
    swticketwatchers,
    swticketworkflowactions,
    swticketworkflowcriteria,
    swticketworkflownotifications,
    swticketworkflows,
    swtroubleshootercategories,
    swtroubleshooterdata,
    swtroubleshooterlinks,
    swtroubleshootersteps,
    swuseremails,
    swusergroupassigns,
    swusergroups,
    swusergroupsettings,
    swuserloginlog,
    swusernotedata,
    swusernotes,
    swuserorganizations,
    swuserprofileimages,
    swuserproperties,
    swusers,
    swusersettings,
    swuserverifyhash,
    swvisitorbans,
    swvisitordata,
    swvisitorfootprints,
    swvisitorgroups,
    swvisitornotedata,
    swvisitornotes,
    swvisitorpulls,
    swvisitorpulls2,
    swvisitorruleactions,
    swvisitorrulecriteria,
    swvisitorrules,
    swwidgets,
    tokens,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
