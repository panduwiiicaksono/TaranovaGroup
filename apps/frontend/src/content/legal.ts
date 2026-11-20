// Halaman legal (Impressum, Datenschutz, Cookies), diambil dari desain resmi (DE dan EN).
// Seluruh teks bisa diedit dari dashboard admin: Content → Legal pages.
//
// Format teks:
//  - Paragraf dipisah baris kosong; baris diawali "• " menjadi daftar.
//  - [teks] = placeholder yang wajib diisi (ditampilkan dengan sorotan kuning).
//  - [teks](/jalur) = link internal, mis. [Cookie-Richtlinie](/cookies).
//  - kind "row" = baris label/nilai (judul = label, body = nilai).
//  - notice = kotak "Entwurf / Draft". KOSONGKAN setelah ditinjau penasihat hukum.

export type LegalTable = { head: string[]; rows: { cells: string[] }[] };
export type LegalSection = { heading: string; kind: "text" | "row"; body: string; table?: LegalTable };
export type LegalPage = { eyebrow: string; title: string; intro: string; updated: string; notice: string; sections: LegalSection[] };
export type Legal = { impressum: LegalPage; datenschutz: LegalPage; cookies: LegalPage };

export const legalDe: Legal = {
  "impressum": {
    "eyebrow": "Rechtliches",
    "title": "Impressum",
    "intro": "Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)",
    "updated": "",
    "notice": "Entwurf zur rechtlichen Prüfung. Gelb markierte Stellen in eckigen Klammern sind Platzhalter oder noch zu prüfen. Vor der Veröffentlichung diesen Hinweis entfernen und die Texte von einer Rechtsanwältin oder einem Rechtsanwalt bzw. der oder dem Datenschutzbeauftragten prüfen lassen.",
    "sections": [
      {
        "heading": "Anbieter",
        "kind": "text",
        "body": "Taranova Group GmbH\nFreiheitstr. 34\n52351 Düren\nDeutschland"
      },
      {
        "heading": "Vertretungsberechtigt",
        "kind": "row",
        "body": "Geschäftsführer: [Vor- und Nachname der Geschäftsführung]"
      },
      {
        "heading": "Telefon",
        "kind": "row",
        "body": "[+49 … – Telefonnummer eintragen]"
      },
      {
        "heading": "E-Mail",
        "kind": "row",
        "body": "[…@… – E-Mail-Adresse eintragen]"
      },
      {
        "heading": "Weitere Kontaktmöglichkeit",
        "kind": "row",
        "body": "[Anfrageformular](/enquiry)"
      },
      {
        "heading": "Registereintrag",
        "kind": "row",
        "body": "Handelsregister, Amtsgericht Düren, HRB 10329"
      },
      {
        "heading": "Umsatzsteuer-ID",
        "kind": "row",
        "body": "Umsatzsteuer-Identifikationsnummer nach § 27a UStG: [DE… – falls vorhanden, sonst Wirtschafts-Identifikationsnummer]"
      },
      {
        "heading": "Stammkapital",
        "kind": "row",
        "body": "[… Euro – nur angeben, wenn Angaben zum Kapital gemacht werden; dann ggf. auch Gesamtbetrag ausstehender Einlagen]"
      },
      {
        "heading": "Aufsichtsbehörde",
        "kind": "row",
        "body": "[Nur angeben, wenn die Tätigkeit einer behördlichen Zulassung bedarf; sonst diese Zeile streichen]"
      },
      {
        "heading": "Inhaltlich verantwortlich (§ 18 Abs. 2 MStV)",
        "kind": "row",
        "body": "[Name und Anschrift – nur erforderlich, wenn die Website journalistisch-redaktionell gestaltete Inhalte enthält; sonst streichen]"
      },
      {
        "heading": "Haftung für Inhalte",
        "kind": "text",
        "body": "Als Diensteanbieter sind wir nach den allgemeinen Gesetzen für eigene Inhalte auf diesen Seiten verantwortlich. Nach den §§ 8 bis 10 DDG sind wir jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.\n\nVerpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben unberührt. Eine Haftung ist erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen entfernen wir die betroffenen Inhalte umgehend."
      },
      {
        "heading": "Haftung für Links",
        "kind": "text",
        "body": "Unser Angebot enthält gegebenenfalls Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für diese fremden Inhalte übernehmen wir daher keine Gewähr. Verantwortlich ist stets der jeweilige Anbieter oder Betreiber der verlinkten Seiten. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar. Bei Bekanntwerden von Rechtsverletzungen entfernen wir derartige Links umgehend."
      },
      {
        "heading": "Urheberrecht",
        "kind": "text",
        "body": "Die von uns erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Rechteinhabers. Soweit Inhalte nicht von uns stammen, werden die Urheberrechte Dritter beachtet. Sollten Sie auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen Hinweis; wir entfernen betroffene Inhalte umgehend."
      },
      {
        "heading": "Bildnachweise",
        "kind": "text",
        "body": "[Fotografinnen, Fotografen und Quellen nennen, sobald echte Fotos eingesetzt werden]"
      }
    ]
  },
  "datenschutz": {
    "eyebrow": "Rechtliches",
    "title": "Datenschutzerklärung",
    "intro": "Informationen nach Art. 13 und 14 der Datenschutz-Grundverordnung (DSGVO) zur Verarbeitung personenbezogener Daten auf dieser Website.",
    "updated": "",
    "notice": "Entwurf zur rechtlichen Prüfung. Gelb markierte Stellen in eckigen Klammern sind Platzhalter oder noch zu prüfen. Vor der Veröffentlichung diesen Hinweis entfernen und die Texte von einer Rechtsanwältin oder einem Rechtsanwalt bzw. der oder dem Datenschutzbeauftragten prüfen lassen.",
    "sections": [
      {
        "heading": "1. Verantwortlicher",
        "kind": "text",
        "body": "Taranova Group GmbH\nFreiheitstr. 34\n52351 Düren\nDeutschland\n\nTelefon: [+49 …] · E-Mail: […@…]\n\nDatenschutzbeauftragte(r): [Name und Kontaktdaten, falls benannt (u. a. Pflicht, wenn in der Regel mindestens 20 Personen ständig mit automatisierter Datenverarbeitung beschäftigt sind, § 38 BDSG); sonst streichen]"
      },
      {
        "heading": "2. Rechtsgrundlagen",
        "kind": "text",
        "body": "Wir verarbeiten personenbezogene Daten nach der DSGVO, dem Bundesdatenschutzgesetz (BDSG) und dem Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz (TDDDG). Je nach Vorgang stützen wir uns auf:\n\n• Art. 6 Abs. 1 lit. a DSGVO – Ihre Einwilligung,\n• Art. 6 Abs. 1 lit. b DSGVO – Vertragserfüllung oder vorvertragliche Maßnahmen auf Ihre Anfrage,\n• Art. 6 Abs. 1 lit. c DSGVO – rechtliche Verpflichtungen (z. B. handels- und steuerrechtliche Aufbewahrung),\n• Art. 6 Abs. 1 lit. f DSGVO – unsere berechtigten Interessen (z. B. sicherer Betrieb der Website, effiziente Bearbeitung von Anfragen)."
      },
      {
        "heading": "3. Hosting und Server-Logfiles",
        "kind": "text",
        "body": "Diese Website wird bei [Hosting-Anbieter, Anschrift und Serverstandort eintragen] gehostet. Beim Aufruf der Seiten verarbeitet der Server automatisch Daten, die Ihr Browser übermittelt: IP-Adresse, Datum und Uhrzeit des Abrufs, aufgerufene Seite oder Datei, Referrer-URL, Browser- und Betriebssystemangaben, übertragene Datenmenge und HTTP-Statuscode.\n\nZweck ist die Auslieferung der Website sowie die Sicherstellung von Stabilität und IT-Sicherheit. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Die Logdaten werden nach [z. B. 7 Tagen – tatsächliche Dauer eintragen] gelöscht oder anonymisiert. Mit dem Hosting-Anbieter besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO [bestätigen]."
      },
      {
        "heading": "4. Anfrageformular und Kontakt",
        "kind": "text",
        "body": "Wenn Sie uns über das Anfrageformular, per E-Mail oder telefonisch kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Daten: Unternehmen, Ansprechperson, E-Mail-Adresse, Telefonnummer (freiwillig), gesuchte Ausbildungsberufe, Zahl der Ausbildungsplätze, gewünschter Starttermin, Ihre Nachricht sowie Zeitpunkt, Sprachversion und Ihre Bestätigung zur Datenverarbeitung. Pflichtfelder sind im Formular mit * markiert.\n\nWir nutzen die Daten, um Ihre Anfrage zu beantworten und ein Angebot oder Gespräch vorzubereiten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, hilfsweise Art. 6 Abs. 1 lit. f DSGVO; soweit wir Ihre Einwilligung einholen, Art. 6 Abs. 1 lit. a DSGVO. Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen.\n\nSpeicherdauer: Wir löschen Ihre Anfrage [z. B. sechs Monate] nach Abschluss der Bearbeitung, sofern kein Vertragsverhältnis zustande kommt und keine gesetzlichen Aufbewahrungspflichten entgegenstehen (z. B. § 257 HGB, § 147 AO)."
      },
      {
        "heading": "5. Speicherung in Microsoft 365",
        "kind": "text",
        "body": "Die Formulardaten werden über [Power Automate] in einer Excel-Datei in [SharePoint / OneDrive] unseres Microsoft-365-Mandanten gespeichert. Anbieter ist Microsoft Ireland Operations Limited, One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, Irland. Wir haben mit Microsoft einen Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO geschlossen [bestätigen]. Die Daten werden in [Rechenzentren in der EU (EU Data Boundary) – bestätigen] verarbeitet. Soweit Daten in Drittländer wie die USA übermittelt werden, stützen wir uns auf [Angemessenheitsbeschluss (EU-US Data Privacy Framework) bzw. Standardvertragsklauseln – bestätigen].\n\nZugriff auf die Datei haben nur [berechtigte Mitarbeitende – Kreis benennen]."
      },
      {
        "heading": "6. Formularverarbeitung und Spamschutz",
        "kind": "text",
        "body": "[Falls ein Dienst zur Formularverarbeitung oder Spamabwehr eingesetzt wird (z. B. Cloudflare Turnstile, hCaptcha, Serverless-Funktion bei Netlify/Cloudflare): Anbieter, Zweck, Rechtsgrundlage und ggf. Drittlandübermittlung ergänzen; sonst Abschnitt streichen]"
      },
      {
        "heading": "7. Schriftarten",
        "kind": "text",
        "body": "Die Schriftarten (IBM Plex Sans, Source Serif 4) werden von unserem eigenen Server ausgeliefert. Beim Aufruf der Website wird keine Verbindung zu Servern von Google oder anderen Dritten für Schriftarten aufgebaut. [Nur zutreffend, wenn die Schriftarten tatsächlich selbst gehostet werden – vor Veröffentlichung prüfen]"
      },
      {
        "heading": "8. Eingebettete Videos",
        "kind": "text",
        "body": "[Nur ausfüllen, wenn ein Video eingebunden wird: Anbieter (z. B. YouTube, Vimeo), Art der Einbindung (Zwei-Klick-Lösung bzw. Einwilligung vor dem Laden), verarbeitete Daten, Rechtsgrundlage Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, Drittlandübermittlung. Sonst Abschnitt streichen]"
      },
      {
        "heading": "9. Cookies",
        "kind": "text",
        "body": "Informationen zu Cookies und ähnlichen Technologien finden Sie in unserer [Cookie-Richtlinie](/cookies)."
      },
      {
        "heading": "10. Empfänger der Daten",
        "kind": "text",
        "body": "Empfänger Ihrer Daten sind, soweit erforderlich: der Hosting-Anbieter, Microsoft (Microsoft 365), [E-Mail- und weitere IT-Dienstleister], Steuer- und Rechtsberater sowie Behörden, wenn wir gesetzlich dazu verpflichtet sind. Eine Weitergabe zu Werbezwecken Dritter findet nicht statt."
      },
      {
        "heading": "11. Ihre Rechte",
        "kind": "text",
        "body": "Sie haben nach der DSGVO folgende Rechte:\n\n• Auskunft über Ihre gespeicherten Daten (Art. 15),\n• Berichtigung unrichtiger Daten (Art. 16),\n• Löschung (Art. 17) und Einschränkung der Verarbeitung (Art. 18),\n• Übertragbarkeit Ihrer Daten (Art. 20),\n• Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen aus Gründen, die sich aus Ihrer besonderen Situation ergeben (Art. 21),\n• Widerruf einer Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3).\n\nZur Ausübung Ihrer Rechte wenden Sie sich an die oben genannten Kontaktdaten. Sie haben außerdem das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren (Art. 77 DSGVO). Für uns zuständig ist die Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen, Kavalleriestraße 2–4, 40213 Düsseldorf [Anschrift vor Veröffentlichung prüfen]."
      },
      {
        "heading": "12. Pflicht zur Bereitstellung, automatisierte Entscheidungen",
        "kind": "text",
        "body": "Die Angabe der Pflichtfelder im Anfrageformular ist erforderlich, damit wir Ihre Anfrage bearbeiten können; ohne sie ist dies nicht möglich. Eine automatisierte Entscheidungsfindung einschließlich Profiling findet nicht statt."
      },
      {
        "heading": "13. Datensicherheit",
        "kind": "text",
        "body": "Die Übertragung zwischen Ihrem Browser und dieser Website erfolgt verschlüsselt (TLS/HTTPS). Wir treffen angemessene technische und organisatorische Maßnahmen, um Ihre Daten zu schützen."
      },
      {
        "heading": "14. Änderungen",
        "kind": "text",
        "body": "Wir passen diese Erklärung an, wenn sich Website, Dienste oder Rechtslage ändern. Stand: 20. November 2026."
      }
    ]
  },
  "cookies": {
    "eyebrow": "Rechtliches",
    "title": "Cookie-Richtlinie",
    "intro": "Diese Seite erklärt, ob und welche Cookies und ähnlichen Technologien wir auf dieser Website einsetzen.",
    "updated": "Stand: 20. November 2026.",
    "notice": "Entwurf zur rechtlichen Prüfung. Gelb markierte Stellen in eckigen Klammern sind Platzhalter oder noch zu prüfen. Vor der Veröffentlichung diesen Hinweis entfernen und die Texte von einer Rechtsanwältin oder einem Rechtsanwalt bzw. der oder dem Datenschutzbeauftragten prüfen lassen.",
    "sections": [
      {
        "heading": "1. Was sind Cookies?",
        "kind": "text",
        "body": "Cookies sind kleine Textdateien, die beim Besuch einer Website auf Ihrem Gerät gespeichert werden. Ähnliche Technologien (z. B. Local Storage) speichern oder lesen ebenfalls Informationen auf Ihrem Endgerät."
      },
      {
        "heading": "2. Welche Cookies setzen wir ein?",
        "kind": "text",
        "body": "Diese Website verwendet [keine Cookies / ausschließlich die unten genannten technisch notwendigen Cookies – nach dem Livegang prüfen]. Wir setzen keine Cookies zu Analyse-, Werbe- oder Trackingzwecken ein.",
        "table": {
          "head": [
            "Name",
            "Anbieter",
            "Zweck",
            "Speicherdauer",
            "Art"
          ],
          "rows": [
            {
              "cells": [
                "[–]",
                "[–]",
                "[Derzeit keine Cookies – Tabelle ggf. ausfüllen]",
                "[–]",
                "[technisch notwendig]"
              ]
            }
          ]
        }
      },
      {
        "heading": "3. Rechtsgrundlage",
        "kind": "text",
        "body": "Technisch unbedingt erforderliche Cookies dürfen wir ohne Ihre Einwilligung einsetzen (§ 25 Abs. 2 Nr. 2 TDDDG). Soweit dabei personenbezogene Daten verarbeitet werden, ist die Rechtsgrundlage Art. 6 Abs. 1 lit. f DSGVO.\n\nCookies oder ähnliche Technologien, die nicht unbedingt erforderlich sind (z. B. für Reichweitenmessung oder eingebettete Drittinhalte), setzen wir nur nach Ihrer vorherigen Einwilligung ein (§ 25 Abs. 1 TDDDG, Art. 6 Abs. 1 lit. a DSGVO). In diesem Fall zeigen wir beim ersten Besuch ein Auswahlfenster, in dem „Alle akzeptieren“ und „Nur notwendige“ gleichwertig angeboten werden. Ihre Entscheidung können Sie jederzeit mit Wirkung für die Zukunft ändern."
      },
      {
        "heading": "4. Eingebettete Inhalte",
        "kind": "text",
        "body": "[Falls ein Video oder anderer Drittinhalt eingebunden wird: Anbieter nennen und darauf hinweisen, dass der Inhalt erst nach Ihrer Einwilligung geladen wird; sonst streichen]"
      },
      {
        "heading": "5. Cookies im Browser verwalten",
        "kind": "text",
        "body": "Sie können Cookies in den Einstellungen Ihres Browsers einsehen, blockieren und löschen. Beachten Sie, dass die Website bei vollständiger Sperrung unter Umständen nicht mehr alle Funktionen bietet."
      },
      {
        "heading": "6. Weitere Informationen",
        "kind": "text",
        "body": "Wie wir personenbezogene Daten verarbeiten, erfahren Sie in unserer [Datenschutzerklärung](/datenschutz). Bei Fragen erreichen Sie uns unter […@…]."
      }
    ]
  }
};

export const legalEn: Legal = {
  "impressum": {
    "eyebrow": "Legal",
    "title": "Legal notice",
    "intro": "Information pursuant to Section 5 of the German Digital Services Act (DDG)",
    "updated": "",
    "notice": "Draft for legal review. Yellow passages in square brackets are placeholders or still to be checked. Remove this notice before publication and have the texts reviewed by a lawyer and/or your data protection officer. This English text is a courtesy translation; the German version is the authoritative one.",
    "sections": [
      {
        "heading": "Provider",
        "kind": "text",
        "body": "Taranova Group GmbH\nFreiheitstr. 34\n52351 Düren\nGermany"
      },
      {
        "heading": "Represented by",
        "kind": "row",
        "body": "Managing director: [First and last name of the managing director]"
      },
      {
        "heading": "Telephone",
        "kind": "row",
        "body": "[+49 … – enter phone number]"
      },
      {
        "heading": "Email",
        "kind": "row",
        "body": "[…@… – enter email address]"
      },
      {
        "heading": "Further contact option",
        "kind": "row",
        "body": "[Enquiry form](/enquiry)"
      },
      {
        "heading": "Commercial register",
        "kind": "row",
        "body": "Local court (Amtsgericht) Düren, HRB 10329"
      },
      {
        "heading": "VAT ID",
        "kind": "row",
        "body": "VAT identification number under Section 27a UStG: [DE… – if available, otherwise business identification number]"
      },
      {
        "heading": "Share capital",
        "kind": "row",
        "body": "[… EUR – only if capital details are given; then also state any outstanding contributions]"
      },
      {
        "heading": "Supervisory authority",
        "kind": "row",
        "body": "[Only if the activity requires an official permit; otherwise delete this line]"
      },
      {
        "heading": "Responsible for content (Section 18(2) MStV)",
        "kind": "row",
        "body": "[Name and address – only required if the website contains journalistic-editorial content; otherwise delete]"
      },
      {
        "heading": "Liability for content",
        "kind": "text",
        "body": "As a service provider we are responsible for our own content on these pages under general law. Under Sections 8 to 10 DDG, however, we are not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate unlawful activity.\n\nObligations to remove or block the use of information under general law remain unaffected. Liability is only possible from the point at which we become aware of a specific infringement. If we become aware of such infringements, we will remove the content concerned without delay."
      },
      {
        "heading": "Liability for links",
        "kind": "text",
        "body": "Our website may contain links to external third-party websites over whose content we have no influence. We therefore cannot accept any liability for that third-party content. The respective provider or operator of the linked pages is always responsible. No legal violations were apparent at the time of linking. If we become aware of infringements, we will remove such links without delay."
      },
      {
        "heading": "Copyright",
        "kind": "text",
        "body": "The content and works created by us on these pages are subject to German copyright law. Reproduction, editing, distribution and any kind of use beyond the limits of copyright law require the written consent of the respective rights holder. Where content was not created by us, the copyrights of third parties are respected. If you become aware of a copyright infringement, please let us know; we will remove the content concerned without delay."
      },
      {
        "heading": "Image credits",
        "kind": "text",
        "body": "[Name photographers and sources once real photos are used]"
      }
    ]
  },
  "datenschutz": {
    "eyebrow": "Legal",
    "title": "Privacy policy",
    "intro": "Information under Articles 13 and 14 of the General Data Protection Regulation (GDPR) on the processing of personal data on this website.",
    "updated": "",
    "notice": "Draft for legal review. Yellow passages in square brackets are placeholders or still to be checked. Remove this notice before publication and have the texts reviewed by a lawyer and/or your data protection officer. This English text is a courtesy translation; the German version is the authoritative one.",
    "sections": [
      {
        "heading": "1. Controller",
        "kind": "text",
        "body": "Taranova Group GmbH\nFreiheitstr. 34\n52351 Düren\nGermany\n\nTelephone: [+49 …] · Email: […@…]\n\nData protection officer: [Name and contact details if appointed (mandatory, among other cases, where at least 20 people are regularly engaged in automated data processing, Section 38 BDSG); otherwise delete]"
      },
      {
        "heading": "2. Legal bases",
        "kind": "text",
        "body": "We process personal data in line with the GDPR, the German Federal Data Protection Act (BDSG) and the Telecommunications Digital Services Data Protection Act (TDDDG). Depending on the activity, we rely on:\n\n• Art. 6(1)(a) GDPR – your consent,\n• Art. 6(1)(b) GDPR – performance of a contract or pre-contractual steps at your request,\n• Art. 6(1)(c) GDPR – legal obligations (e.g. commercial and tax record keeping),\n• Art. 6(1)(f) GDPR – our legitimate interests (e.g. secure operation of the website, efficient handling of enquiries)."
      },
      {
        "heading": "3. Hosting and server log files",
        "kind": "text",
        "body": "This website is hosted by [enter hosting provider, address and server location]. When you open the pages, the server automatically processes data sent by your browser: IP address, date and time of the request, page or file requested, referrer URL, browser and operating system details, data volume and HTTP status code.\n\nThe purpose is to deliver the website and to ensure stability and IT security. The legal basis is Art. 6(1)(f) GDPR. Log data is deleted or anonymised after [e.g. 7 days – enter actual period]. A data processing agreement under Art. 28 GDPR is in place with the hosting provider [confirm]."
      },
      {
        "heading": "4. Enquiry form and contact",
        "kind": "text",
        "body": "If you contact us through the enquiry form, by email or by phone, we process the data you provide: company, contact person, email address, phone number (optional), requested training occupations, number of training places, preferred start date, your message, as well as the time, language version and your confirmation regarding data processing. Required fields are marked with * in the form.\n\nWe use the data to answer your enquiry and to prepare an offer or conversation. The legal basis is Art. 6(1)(b) GDPR, alternatively Art. 6(1)(f) GDPR; where we ask for your consent, Art. 6(1)(a) GDPR. You can withdraw any consent at any time with effect for the future.\n\nRetention: we delete your enquiry [e.g. six months] after it has been handled, unless a contract is concluded or statutory retention duties apply (e.g. Section 257 HGB, Section 147 AO)."
      },
      {
        "heading": "5. Storage in Microsoft 365",
        "kind": "text",
        "body": "Form data is stored via [Power Automate] in an Excel file in [SharePoint / OneDrive] of our Microsoft 365 tenant. The provider is Microsoft Ireland Operations Limited, One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, Ireland. We have concluded a data processing agreement with Microsoft under Art. 28 GDPR [confirm]. Data is processed in [EU data centres (EU Data Boundary) – confirm]. Where data is transferred to third countries such as the USA, we rely on [adequacy decision (EU-US Data Privacy Framework) or standard contractual clauses – confirm].\n\nOnly [authorised staff – name the group] have access to the file."
      },
      {
        "heading": "6. Form processing and spam protection",
        "kind": "text",
        "body": "[If a service is used for form processing or spam protection (e.g. Cloudflare Turnstile, hCaptcha, a serverless function at Netlify/Cloudflare): add provider, purpose, legal basis and any third-country transfer; otherwise delete this section]"
      },
      {
        "heading": "7. Fonts",
        "kind": "text",
        "body": "The fonts (IBM Plex Sans, Source Serif 4) are delivered from our own server. No connection to Google or other third-party servers is made for fonts when you open the website. [Only accurate if the fonts are actually self-hosted – check before publication]"
      },
      {
        "heading": "8. Embedded videos",
        "kind": "text",
        "body": "[Fill in only if a video is embedded: provider (e.g. YouTube, Vimeo), method of embedding (two-click solution or consent before loading), data processed, legal basis Art. 6(1)(a) GDPR and Section 25(1) TDDDG, third-country transfer. Otherwise delete this section]"
      },
      {
        "heading": "9. Cookies",
        "kind": "text",
        "body": "Information on cookies and similar technologies is in our [Cookie policy](/cookies)."
      },
      {
        "heading": "10. Recipients of data",
        "kind": "text",
        "body": "Where necessary, recipients of your data are: the hosting provider, Microsoft (Microsoft 365), [email and other IT service providers], tax and legal advisers, and authorities where we are legally obliged to disclose data. We do not pass data on to third parties for advertising."
      },
      {
        "heading": "11. Your rights",
        "kind": "text",
        "body": "Under the GDPR you have the following rights:\n\n• access to your stored data (Art. 15),\n• rectification of inaccurate data (Art. 16),\n• erasure (Art. 17) and restriction of processing (Art. 18),\n• data portability (Art. 20),\n• objection to processing based on legitimate interests, on grounds relating to your particular situation (Art. 21),\n• withdrawal of consent with effect for the future (Art. 7(3)).\n\nTo exercise your rights, use the contact details above. You also have the right to lodge a complaint with a data protection supervisory authority (Art. 77 GDPR). The authority responsible for us is the State Commissioner for Data Protection and Freedom of Information of North Rhine-Westphalia (Landesbeauftragte für Datenschutz und Informationsfreiheit NRW), Kavalleriestraße 2–4, 40213 Düsseldorf [verify address before publication]."
      },
      {
        "heading": "12. Obligation to provide data, automated decisions",
        "kind": "text",
        "body": "The required fields in the enquiry form must be completed so that we can handle your enquiry; without them this is not possible. There is no automated decision-making, including profiling."
      },
      {
        "heading": "13. Data security",
        "kind": "text",
        "body": "Data between your browser and this website is transmitted in encrypted form (TLS/HTTPS). We take appropriate technical and organisational measures to protect your data."
      },
      {
        "heading": "14. Changes",
        "kind": "text",
        "body": "We update this notice when the website, our services or the legal situation change. Status: 20 November 2026."
      }
    ]
  },
  "cookies": {
    "eyebrow": "Legal",
    "title": "Cookie policy",
    "intro": "This page explains whether and which cookies and similar technologies we use on this website.",
    "updated": "Status: 20 November 2026.",
    "notice": "Draft for legal review. Yellow passages in square brackets are placeholders or still to be checked. Remove this notice before publication and have the texts reviewed by a lawyer and/or your data protection officer. This English text is a courtesy translation; the German version is the authoritative one.",
    "sections": [
      {
        "heading": "1. What are cookies?",
        "kind": "text",
        "body": "Cookies are small text files stored on your device when you visit a website. Similar technologies (e.g. local storage) also store or read information on your device."
      },
      {
        "heading": "2. Which cookies do we use?",
        "kind": "text",
        "body": "This website uses [no cookies / only the strictly necessary cookies listed below – check after going live]. We do not use cookies for analytics, advertising or tracking.",
        "table": {
          "head": [
            "Name",
            "Provider",
            "Purpose",
            "Storage period",
            "Type"
          ],
          "rows": [
            {
              "cells": [
                "[–]",
                "[–]",
                "[No cookies at present – fill in the table if needed]",
                "[–]",
                "[strictly necessary]"
              ]
            }
          ]
        }
      },
      {
        "heading": "3. Legal basis",
        "kind": "text",
        "body": "We may use strictly necessary cookies without your consent (Section 25(2) no. 2 TDDDG). Where personal data is processed in the process, the legal basis is Art. 6(1)(f) GDPR.\n\nWe only use cookies or similar technologies that are not strictly necessary (e.g. for audience measurement or embedded third-party content) after your prior consent (Section 25(1) TDDDG, Art. 6(1)(a) GDPR). In that case a selection window appears on your first visit, offering “Accept all” and “Necessary only” with equal prominence. You can change your decision at any time with effect for the future."
      },
      {
        "heading": "4. Embedded content",
        "kind": "text",
        "body": "[If a video or other third-party content is embedded: name the provider and state that the content is only loaded after your consent; otherwise delete]"
      },
      {
        "heading": "5. Managing cookies in your browser",
        "kind": "text",
        "body": "You can view, block and delete cookies in your browser settings. Please note that blocking all cookies may limit some functions of the website."
      },
      {
        "heading": "6. More information",
        "kind": "text",
        "body": "How we process personal data is described in our [Privacy policy](/datenschutz). If you have questions, contact us at […@…]."
      }
    ]
  }
};
