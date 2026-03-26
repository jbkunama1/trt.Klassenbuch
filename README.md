# 📚 Lehrkraft Dashboard – Dein digitales Klassenbuch

Ein modernes, buntes und **mobile-freundliches** Web-Dashboard für Lehrkräfte zur digitalen Unterrichtsdokumentation: Klassenbuch, Klassenlisten & Export – alles in einer kleinen PHP/SQLite-Webapp. [web:16][web:21]

---

## ✨ Features auf einen Blick

- 📖 **Digitales Klassenbuch**
  - Pro Tag/Stunde: Fach, Klasse, Thema, Notizen
  - Schnelles Navigieren über Datumsauswahl
  - Filter nach Klasse/Fach

- 👥 **Klassenlisten**
  - Klassen anlegen, bearbeiten & löschen
  - Schüler hinzufügen, bearbeiten & entfernen
  - Automatische Verknüpfung mit Klassenbucheinträgen

- 💾 **Serverseitige Speicherung (SQLite)**
  - Alle Daten werden zentral in einer SQLite-Datenbank gespeichert
  - Mehrere Lehrkräfte können gleichzeitig arbeiten (gleicher Serverzugang) [web:22][web:25]

- 🖨️ **Export & Drucken**
  - Druck-/PDF-Ansicht für:
    - Klassenbuch (z.B. Wochenübersicht)
    - Klassenlisten
  - Nutzung des Browser-Druckdialogs → „Als PDF speichern“ [web:21]

- 🔐 **Passwortschutz**
  - Einfacher Login mit Passwort (in `index.php` konfiguriert)

- 📱 **Responsive & buntes UI**
  - Optimiert für Smartphone, Tablet & Desktop
  - Modernes Farbschema, Icon-Buttons, übersichtliche Tabellen

---

## 🧩 Technische Architektur

- ⚙️ **Backend:** PHP + SQLite (Dateidatenbank) [web:22][web:25]  
- 🎨 **Frontend:**
  - `index.php` → HTML-Struktur + PHP-API
  - `app.js` → Fetch-Requests, Event-Handling, dynamisches Rendering
  - `style.css` → Farben, Layout, Responsive Design

### 📁 Dateistruktur

```text
projekt-root/
├── index.php        # PHP + HTML + rudimentäre API
├── app.js           # Frontend-Logik (JS)
└── style.css        # Styles (bunt, responsive)
```

Die SQLite-Datenbank (z.B. `data/dashboard.db`) wird beim ersten Aufruf automatisch erstellt. [web:22]

---

## 🚀 Installation & Start

1. **Repository klonen oder Dateien kopieren**

```bash
git clone https://github.com/<dein-user>/<dein-repo>.git
cd <dein-repo>
```

2. **Auf PHP-fähigen Server legen**  
   (z.B. Apache, Nginx mit PHP-FPM; SQLite-Erweiterung aktiv). [web:25]

3. **Datenbankverzeichnis anlegen (optional, empfohlen)**

```bash
mkdir data
chown www-data:www-data data
chmod 770 data
```

4. **Im Browser aufrufen**

```text
https://deine-domain.de/lehrkraft-dashboard/index.php
```

Beim ersten Aufruf:
- 📂 SQLite-Datei wird angelegt
- 🧱 Tabellen für Klassen, Schüler, Klassenbuch erzeugt

---

## 🧑‍🏫 Nutzung im Alltag

### 🔑 Login

- Auf `index.php` aufrufen  
- Passwort eingeben → Dashboard wird freigeschaltet  
- Passwortänderung in `index.php` möglich

### 👥 Klassenlisten

- ➕ Neue Klasse anlegen (z.B. „7a“, Schuljahr, Kürzel)
- 📝 Schüler per Formular hinzufügen
- ✏️ Klasse/Schüler bearbeiten
- 🗑️ Ganze Klassen löschen (mit Sicherheitsabfrage)

### 📖 Klassenbuch

- Datum + Klasse wählen
- Pro Stunde eintragen:
  - Fach (z.B. Sport, Technik, Informatik)
  - Thema/Inhalt
  - Bemerkungen (z.B. Sozialform, Auffälligkeiten)
- Einträge werden sofort in SQLite gespeichert

### 🖨️ PDF / Drucken

- Button „🖨️ Drucken / Export“ im Klassenbuch und bei Klassenlisten
- Browser-Dialog:
  - Ziel: „Als PDF speichern“
  - Format: A4, Hochformat (empfohlen) [web:21]

---

## 🎨 Design-Ideen & Assets

- 🌈 **Farbpalette**:
  - Dunkelblau für Header/Navigation
  - Helle Blautöne für Tabellen-Hintergründe
  - Akzentfarbe Orange für Buttons
- 🖼️ **Logo**:
  - Eigenes Logo `lehrkraft_logo.png` als Favicon & im Header nutzen
- 🧩 **Icons**:
  - Klassenbuch-Icon 📖
  - Klassenlisten-Icon 👥
  - Export-Icon 🖨️
  - Bearbeiten ✏️, Löschen 🗑️

Beispiel-Einbindung im HTML-Header:

```html
<link rel="icon" type="image/png" href="lehrkraft_logo.png">
```

---

## 🔧 Konfiguration

In `index.php` kannst du u.a. anpassen:

- 🔐 Passwort für den Login
- 📂 Pfad zur SQLite-Datei
- 🔄 ggf. Namen der Tabellen (falls du erweitern möchtest)

---

## 💡 Erweiterungsideen

- 🧮 Einfache Notenübersicht pro Klasse/Schüler
- 📅 Stoffverteilungsplan als weiteres Modul
- 📤 CSV-Export für Klassenbuch/Listen
- 🌍 Mehrsprachigkeit (DE/EN Umschalter)
- 🔁 Backup-/Restore-Funktion für die SQLite-Datei

---

## 📜 Lizenz

Trage hier deine gewünschte Lizenz ein (z.B. MIT, Apache 2.0 oder schulinterne Nutzung). [web:26]

```text
© 2026 – Lehrkraft Dashboard. Nutzung nach den Bedingungen der beigefügten Lizenz.
```
