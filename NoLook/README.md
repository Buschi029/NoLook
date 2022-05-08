NoLook Kalender
====================
Kurzbeschreibung
----------------
Die Webapplikation „NoLook“ hat den Sinn, beim Managen von Terminen und Aufgaben zu helfen. Es können Termine, mit Zeitpunkt und Dauer, und Aufgaben, die nur einem Tag zugeordnet werden, verwaltet werden. Die Einträge können gespeichert, gelöscht und nachträglich nearneitet werden.

Navigationsleiste
----------------
Durch die Navigationsleiste kann man zwischen zwei Tab-Reiter wählen. Der Tab ist die Anzeige des Kalender des aktuellen Monats und bei dem Reiter Aufgabenlist kann man sich alle Aufgaben für die nächsten zwei Tage anzeigen lassen.

Kalender-Ansicht
----------------
Die erste Ansicht ist die Anzeige des Kalender. Dabei wird ein Monat dargestellt und kann jedoch mithilfe der Pfeil geändert werden und so alle Monate in allen Jahren ausgewählt werden. Man kann die Wochentage ablesen und es werden sogar die Tage herausgehoben, an denen es eine Aufgabe oder einen Termin gibt. Die Tage die nicht zum Monat gehören werden grau markiert. Durch das anklicken der Kacheln im Kalender wird der Tag in der Kombi-Ansicht gezeigt.

Aufgabenliste
----------------
In der Aufgabenliste werden alle Aufgaben für die nächsten zwei Tage gezeigt. Durch die Pfeilknöpfe kann man die zwei angezeigten Tage ändern. Über einen Knopf oben an der Seite kann man einen neuen Eintrag erstellen. Alle angezeigten Aufgaben lassen sich über die Icons löschen oder bearbeiten.

Kombi-Ansicht
----------------
Für den ausgewählten Tag, der in der Kalenderansicht ausgwählt wurde, werden nun alle Termine und Aufgaben für den Tag angezeigt. Es lässt sich auch oben an der Seite ein neuer Eintrag erstellen. Alle bestehenden Einträge die angezeigt werden, kann man über die Icons bearbeiten oder löschen.

Eintrag erstellen
----------------
Ein neuer Eintrag wird in einer neuen Ansicht erstellt. Dabei kann man auswählen ob man einen Termin oder eine Aufgabe erstellen möchte. Abhängig von der Auswahl verändern sich die Eingabefenster. Die Speicherung erfolgt über den Speicehern-Button. Nach dem speichern gelangt man wieder zur Kalenderansicht.

Eintrag beabreiten
----------------
Analog zum Eintrag erstellen wird heirfür eine neue Ansicht geöffnet indem alle Daten des angeklickten Eintrages angezeigt werden, die dan verändert werden können und gespeichert werden. Die Speicherung erfolgt über den Speicehern-Button. Nach dem speichern gelangt man wieder zur Kalenderansicht.

Daten
----------------
Die Daten werden in einen Termin Objekt gespeichert. Es besteht aus der id, die vom System vergeben wird, dem Titel, der den Eintrag beschreibt, und noch ein Datum und einen Zeitraum. Wenn es eine Aufgabe ist wird keine Zeit und Dauer gespiechert sondern nur das Datum. Jedes Objekt besitzt auch noch eine Variable die beschreibt ob es ein Termin oder eine Aufgabe ist. Damit die Daten verarbeitet und mit der Datenbank verknüpft werden, wurde im Backend ein Termin-Service und Termin-Controller, welcher im Index des Backends registriert wurde, erstellt.
