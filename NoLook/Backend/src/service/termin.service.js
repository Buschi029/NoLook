"use strict"

import DatabaseFactory from "../database.js";
import {ObjectId} from "mongodb";

/**
 * Geschäftslogik zur Verwaltung von Adressen. Diese Klasse implementiert die
 * eigentliche Anwendungslogik losgelöst vom technischen Übertragungsweg.
 * Die Adressen werden der Einfachheit halber in einer MongoDB abgelegt.
 */
export default class TerminService {
    /**
     * Konstruktor.
     */
    constructor() {
        this._termine = DatabaseFactory.database.collection("termine");
    }

    /**
     * Adressen suchen. Unterstützt wird lediglich eine ganz einfache Suche,
     * bei der einzelne Felder auf exakte Übereinstimmung geprüft werden.
     * Zwar unterstützt MongoDB prinzipiell beliebig komplexe Suchanfragen.
     * Um das Beispiel klein zu halten, wird dies hier aber nicht unterstützt.
     *
     * @param {Object} query Optionale Suchparameter
     * @return {Promise} Liste der gefundenen Adressen
     */
    async search(query) {
        let cursor = this._termine.find(query, {
            sort: {
                title: 1
            }
        });

        return cursor.toArray();
    }

    /**
     * Speichern einer neuen Adresse.
     *
     * @param {Object} address Zu speichernde Adressdaten
     * @return {Promise} Gespeicherte Adressdaten
     */
    async create(termin) {
        termin = termin || {};

        let newTermin = {
            title: termin.title || "",
            date:  termin.date  || "",
            duration:      termin.duration      || "",
            kind:      termin.kind      || "",
        };

        let result = await this._termine.insertOne(newTermin);
        return await this._termine.findOne({_id: result.insertedId});
    }

    /**
     * Auslesen einer vorhandenen Adresse anhand ihrer ID.
     *
     * @param {String} id ID der gesuchten Adresse
     * @return {Promise} Gefundene Adressdaten
     */
    async read(id) {
        let result = await this._termine.findOne({_id: new ObjectId(id)});
        return result;
    }

    /**
     * Aktualisierung einer Adresse, durch Überschreiben einzelner Felder
     * oder des gesamten Adressobjekts (ohne die ID).
     *
     * @param {String} id ID der gesuchten Adresse
     * @param {[type]} address Zu speichernde Adressdaten
     * @return {Promise} Gespeicherte Adressdaten oder undefined
     */
    async update(id, termin) {
        let oldTermin = await this._termine.findOne({_id: new ObjectId(id)});
        if (!oldTermin) return;

        let updateDoc = {
            $set: {},
        }

        if (termin.title) updateDoc.$set.title = termin.title;
        if (termin.date)  updateDoc.$set.date  = termin.date;
        if (termin.duration)      updateDoc.$set.duration      = termin.duration;
        if (termin.kind)      updateDoc.$set.kind      = termin.kind;

        await this._termine.updateOne({_id: new ObjectId(id)}, updateDoc);
        return this._termine.findOne({_id: new ObjectId(id)});
    }

    /**
     * Löschen einer Adresse anhand ihrer ID.
     *
     * @param {String} id ID der gesuchten Adresse
     * @return {Promise} Anzahl der gelöschten Datensätze
     */
    async delete(id) {
        let result = await this._termine.deleteOne({_id: new ObjectId(id)});
        return result.deletedCount;
    }
}
