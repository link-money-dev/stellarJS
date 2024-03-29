/*
 * File:        jquery.dataTables.min.js
 * Version:     1.9.4
 * Author:      Allan Jardine (www.sprymedia.co.uk)
 * Info:        www.datatables.net
 *
 * Copyright 2008-2012 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, available at:
 *   http://datatables.net/license_gpl2
 *   http://datatables.net/license_bsd
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 */
(function (la, s, p) {
    (function (i) {
        if (typeof define === "function" && define.amd) define(["jquery"], i); else jQuery && !jQuery.fn.dataTable && i(jQuery)
    })(function (i) {
        var l = function (h) {
            function n(a, b) {
                var c = l.defaults.columns, d = a.aoColumns.length;
                b = i.extend({}, l.models.oColumn, c, {
                    sSortingClass: a.oClasses.sSortable,
                    sSortingClassJUI: a.oClasses.sSortJUI,
                    nTh: b ? b : s.createElement("th"),
                    sTitle: c.sTitle ? c.sTitle : b ? b.innerHTML : "",
                    aDataSort: c.aDataSort ? c.aDataSort : [d],
                    mData: c.mData ? c.oDefaults : d
                });
                a.aoColumns.push(b);
                if (a.aoPreSearchCols[d] ===
                    p || a.aoPreSearchCols[d] === null) a.aoPreSearchCols[d] = i.extend({}, l.models.oSearch); else {
                    b = a.aoPreSearchCols[d];
                    if (b.bRegex === p) b.bRegex = true;
                    if (b.bSmart === p) b.bSmart = true;
                    if (b.bCaseInsensitive === p) b.bCaseInsensitive = true
                }
                q(a, d, null)
            }

            function q(a, b, c) {
                var d = a.aoColumns[b];
                if (c !== p && c !== null) {
                    if (c.mDataProp && !c.mData) c.mData = c.mDataProp;
                    if (c.sType !== p) {
                        d.sType = c.sType;
                        d._bAutoType = false
                    }
                    i.extend(d, c);
                    r(d, c, "sWidth", "sWidthOrig");
                    if (c.iDataSort !== p) d.aDataSort = [c.iDataSort];
                    r(d, c, "aDataSort")
                }
                var e = d.mRender ?
                    ca(d.mRender) : null, f = ca(d.mData);
                d.fnGetData = function (g, j) {
                    var k = f(g, j);
                    if (d.mRender && j && j !== "") return e(k, j, g);
                    return k
                };
                d.fnSetData = Ja(d.mData);
                if (!a.oFeatures.bSort) d.bSortable = false;
                if (!d.bSortable || i.inArray("asc", d.asSorting) == -1 && i.inArray("desc", d.asSorting) == -1) {
                    d.sSortingClass = a.oClasses.sSortableNone;
                    d.sSortingClassJUI = ""
                } else if (i.inArray("asc", d.asSorting) == -1 && i.inArray("desc", d.asSorting) == -1) {
                    d.sSortingClass = a.oClasses.sSortable;
                    d.sSortingClassJUI = a.oClasses.sSortJUI
                } else if (i.inArray("asc",
                        d.asSorting) != -1 && i.inArray("desc", d.asSorting) == -1) {
                    d.sSortingClass = a.oClasses.sSortableAsc;
                    d.sSortingClassJUI = a.oClasses.sSortJUIAscAllowed
                } else if (i.inArray("asc", d.asSorting) == -1 && i.inArray("desc", d.asSorting) != -1) {
                    d.sSortingClass = a.oClasses.sSortableDesc;
                    d.sSortingClassJUI = a.oClasses.sSortJUIDescAllowed
                }
            }

            function o(a) {
                if (a.oFeatures.bAutoWidth === false) return false;
                ta(a);
                for (var b = 0, c = a.aoColumns.length; b < c; b++) a.aoColumns[b].nTh.style.width = a.aoColumns[b].sWidth
            }

            function v(a, b) {
                a = A(a, "bVisible");
                return typeof a[b] === "number" ? a[b] : null
            }

            function w(a, b) {
                a = A(a, "bVisible");
                b = i.inArray(b, a);
                return b !== -1 ? b : null
            }

            function D(a) {
                return A(a, "bVisible").length
            }

            function A(a, b) {
                var c = [];
                i.map(a.aoColumns, function (d, e) {
                    d[b] && c.push(e)
                });
                return c
            }

            function G(a) {
                for (var b = l.ext.aTypes, c = b.length, d = 0; d < c; d++) {
                    var e = b[d](a);
                    if (e !== null) return e
                }
                return "string"
            }

            function E(a, b) {
                b = b.split(",");
                for (var c = [], d = 0, e = a.aoColumns.length; d < e; d++) for (var f = 0; f < e; f++) if (a.aoColumns[d].sName == b[f]) {
                    c.push(f);
                    break
                }
                return c
            }

            function Y(a) {
                for (var b = "", c = 0, d = a.aoColumns.length; c < d; c++) b += a.aoColumns[c].sName + ",";
                if (b.length == d) return "";
                return b.slice(0, -1)
            }

            function ma(a, b, c, d) {
                var e, f, g, j, k;
                if (b) for (e = b.length - 1; e >= 0; e--) {
                    var m = b[e].aTargets;
                    i.isArray(m) || O(a, 1, "aTargets must be an array of targets, not a " + typeof m);
                    f = 0;
                    for (g = m.length; f < g; f++) if (typeof m[f] === "number" && m[f] >= 0) {
                        for (; a.aoColumns.length <= m[f];) n(a);
                        d(m[f], b[e])
                    } else if (typeof m[f] === "number" && m[f] < 0) d(a.aoColumns.length + m[f], b[e]); else if (typeof m[f] ===
                        "string") {
                        j = 0;
                        for (k = a.aoColumns.length; j < k; j++) if (m[f] == "_all" || i(a.aoColumns[j].nTh).hasClass(m[f])) d(j, b[e])
                    }
                }
                if (c) {
                    e = 0;
                    for (a = c.length; e < a; e++) d(e, c[e])
                }
            }

            function R(a, b) {
                var c;
                c = i.isArray(b) ? b.slice() : i.extend(true, {}, b);
                b = a.aoData.length;
                var d = i.extend(true, {}, l.models.oRow);
                d._aData = c;
                a.aoData.push(d);
                var e;
                d = 0;
                for (var f = a.aoColumns.length; d < f; d++) {
                    c = a.aoColumns[d];
                    typeof c.fnRender === "function" && c.bUseRendered && c.mData !== null ? S(a, b, d, da(a, b, d)) : S(a, b, d, F(a, b, d));
                    if (c._bAutoType && c.sType != "string") {
                        e =
                            F(a, b, d, "type");
                        if (e !== null && e !== "") {
                            e = G(e);
                            if (c.sType === null) c.sType = e; else if (c.sType != e && c.sType != "html") c.sType = "string"
                        }
                    }
                }
                a.aiDisplayMaster.push(b);
                a.oFeatures.bDeferRender || ua(a, b);
                return b
            }

            function ea(a) {
                var b, c, d, e, f, g, j;
                if (a.bDeferLoading || a.sAjaxSource === null) for (b = a.nTBody.firstChild; b;) {
                    if (b.nodeName.toUpperCase() == "TR") {
                        c = a.aoData.length;
                        b._DT_RowIndex = c;
                        a.aoData.push(i.extend(true, {}, l.models.oRow, {nTr: b}));
                        a.aiDisplayMaster.push(c);
                        f = b.firstChild;
                        for (d = 0; f;) {
                            g = f.nodeName.toUpperCase();
                            if (g == "TD" || g == "TH") {
                                S(a, c, d, i.trim(f.innerHTML));
                                d++
                            }
                            f = f.nextSibling
                        }
                    }
                    b = b.nextSibling
                }
                e = fa(a);
                d = [];
                b = 0;
                for (c = e.length; b < c; b++) for (f = e[b].firstChild; f;) {
                    g = f.nodeName.toUpperCase();
                    if (g == "TD" || g == "TH") d.push(f);
                    f = f.nextSibling
                }
                c = 0;
                for (e = a.aoColumns.length; c < e; c++) {
                    j = a.aoColumns[c];
                    if (j.sTitle === null) j.sTitle = j.nTh.innerHTML;
                    var k = j._bAutoType, m = typeof j.fnRender === "function", u = j.sClass !== null, x = j.bVisible,
                        y, B;
                    if (k || m || u || !x) {
                        g = 0;
                        for (b = a.aoData.length; g < b; g++) {
                            f = a.aoData[g];
                            y = d[g * e + c];
                            if (k && j.sType !=
                                "string") {
                                B = F(a, g, c, "type");
                                if (B !== "") {
                                    B = G(B);
                                    if (j.sType === null) j.sType = B; else if (j.sType != B && j.sType != "html") j.sType = "string"
                                }
                            }
                            if (j.mRender) y.innerHTML = F(a, g, c, "display"); else if (j.mData !== c) y.innerHTML = F(a, g, c, "display");
                            if (m) {
                                B = da(a, g, c);
                                y.innerHTML = B;
                                j.bUseRendered && S(a, g, c, B)
                            }
                            if (u) y.className += " " + j.sClass;
                            if (x) f._anHidden[c] = null; else {
                                f._anHidden[c] = y;
                                y.parentNode.removeChild(y)
                            }
                            j.fnCreatedCell && j.fnCreatedCell.call(a.oInstance, y, F(a, g, c, "display"), f._aData, g, c)
                        }
                    }
                }
                if (a.aoRowCreatedCallback.length !==
                    0) {
                    b = 0;
                    for (c = a.aoData.length; b < c; b++) {
                        f = a.aoData[b];
                        K(a, "aoRowCreatedCallback", null, [f.nTr, f._aData, b])
                    }
                }
            }

            function V(a, b) {
                return b._DT_RowIndex !== p ? b._DT_RowIndex : null
            }

            function va(a, b, c) {
                b = W(a, b);
                var d = 0;
                for (a = a.aoColumns.length; d < a; d++) if (b[d] === c) return d;
                return -1
            }

            function na(a, b, c, d) {
                for (var e = [], f = 0, g = d.length; f < g; f++) e.push(F(a, b, d[f], c));
                return e
            }

            function F(a, b, c, d) {
                var e = a.aoColumns[c];
                if ((c = e.fnGetData(a.aoData[b]._aData, d)) === p) {
                    if (a.iDrawError != a.iDraw && e.sDefaultContent === null) {
                        O(a, 0, "Requested unknown parameter " +
                            (typeof e.mData == "function" ? "{mData function}" : "'" + e.mData + "'") + " from the data source for row " + b);
                        a.iDrawError = a.iDraw
                    }
                    return e.sDefaultContent
                }
                if (c === null && e.sDefaultContent !== null) c = e.sDefaultContent; else if (typeof c === "function") return c();
                if (d == "display" && c === null) return "";
                return c
            }

            function S(a, b, c, d) {
                a.aoColumns[c].fnSetData(a.aoData[b]._aData, d)
            }

            function ca(a) {
                if (a === null) return function () {
                    return null
                }; else if (typeof a === "function") return function (c, d, e) {
                    return a(c, d, e)
                }; else if (typeof a ===
                    "string" && (a.indexOf(".") !== -1 || a.indexOf("[") !== -1)) {
                    var b = function (c, d, e) {
                        var f = e.split("."), g;
                        if (e !== "") {
                            var j = 0;
                            for (g = f.length; j < g; j++) {
                                if (e = f[j].match(ga)) {
                                    f[j] = f[j].replace(ga, "");
                                    if (f[j] !== "") c = c[f[j]];
                                    g = [];
                                    f.splice(0, j + 1);
                                    f = f.join(".");
                                    j = 0;
                                    for (var k = c.length; j < k; j++) g.push(b(c[j], d, f));
                                    c = e[0].substring(1, e[0].length - 1);
                                    c = c === "" ? g : g.join(c);
                                    break
                                }
                                if (c === null || c[f[j]] === p) return p;
                                c = c[f[j]]
                            }
                        }
                        return c
                    };
                    return function (c, d) {
                        return b(c, d, a)
                    }
                } else return function (c) {
                    return c[a]
                }
            }

            function Ja(a) {
                if (a ===
                    null) return function () {
                }; else if (typeof a === "function") return function (c, d) {
                    a(c, "set", d)
                }; else if (typeof a === "string" && (a.indexOf(".") !== -1 || a.indexOf("[") !== -1)) {
                    var b = function (c, d, e) {
                        e = e.split(".");
                        var f, g, j = 0;
                        for (g = e.length - 1; j < g; j++) {
                            if (f = e[j].match(ga)) {
                                e[j] = e[j].replace(ga, "");
                                c[e[j]] = [];
                                f = e.slice();
                                f.splice(0, j + 1);
                                g = f.join(".");
                                for (var k = 0, m = d.length; k < m; k++) {
                                    f = {};
                                    b(f, d[k], g);
                                    c[e[j]].push(f)
                                }
                                return
                            }
                            if (c[e[j]] === null || c[e[j]] === p) c[e[j]] = {};
                            c = c[e[j]]
                        }
                        c[e[e.length - 1].replace(ga, "")] = d
                    };
                    return function (c,
                                     d) {
                        return b(c, d, a)
                    }
                } else return function (c, d) {
                    c[a] = d
                }
            }

            function oa(a) {
                for (var b = [], c = a.aoData.length, d = 0; d < c; d++) b.push(a.aoData[d]._aData);
                return b
            }

            function wa(a) {
                a.aoData.splice(0, a.aoData.length);
                a.aiDisplayMaster.splice(0, a.aiDisplayMaster.length);
                a.aiDisplay.splice(0, a.aiDisplay.length);
                I(a)
            }

            function xa(a, b) {
                for (var c = -1, d = 0, e = a.length; d < e; d++) if (a[d] == b) c = d; else a[d] > b && a[d]--;
                c != -1 && a.splice(c, 1)
            }

            function da(a, b, c) {
                var d = a.aoColumns[c];
                return d.fnRender({
                    iDataRow: b, iDataColumn: c, oSettings: a,
                    aData: a.aoData[b]._aData, mDataProp: d.mData
                }, F(a, b, c, "display"))
            }

            function ua(a, b) {
                var c = a.aoData[b], d;
                if (c.nTr === null) {
                    c.nTr = s.createElement("tr");
                    c.nTr._DT_RowIndex = b;
                    if (c._aData.DT_RowId) c.nTr.id = c._aData.DT_RowId;
                    if (c._aData.DT_RowClass) c.nTr.className = c._aData.DT_RowClass;
                    for (var e = 0, f = a.aoColumns.length; e < f; e++) {
                        var g = a.aoColumns[e];
                        d = s.createElement(g.sCellType);
                        d.innerHTML = typeof g.fnRender === "function" && (!g.bUseRendered || g.mData === null) ? da(a, b, e) : F(a, b, e, "display");
                        if (g.sClass !== null) d.className =
                            g.sClass;
                        if (g.bVisible) {
                            c.nTr.appendChild(d);
                            c._anHidden[e] = null
                        } else c._anHidden[e] = d;
                        g.fnCreatedCell && g.fnCreatedCell.call(a.oInstance, d, F(a, b, e, "display"), c._aData, b, e)
                    }
                    K(a, "aoRowCreatedCallback", null, [c.nTr, c._aData, b])
                }
            }

            function Ka(a) {
                var b, c, d;
                if (i("th, td", a.nTHead).length !== 0) {
                    b = 0;
                    for (d = a.aoColumns.length; b < d; b++) {
                        c = a.aoColumns[b].nTh;
                        c.setAttribute("role", "columnheader");
                        if (a.aoColumns[b].bSortable) {
                            c.setAttribute("tabindex", a.iTabIndex);
                            c.setAttribute("aria-controls", a.sTableId)
                        }
                        a.aoColumns[b].sClass !==
                        null && i(c).addClass(a.aoColumns[b].sClass);
                        if (a.aoColumns[b].sTitle != c.innerHTML) c.innerHTML = a.aoColumns[b].sTitle
                    }
                } else {
                    var e = s.createElement("tr");
                    b = 0;
                    for (d = a.aoColumns.length; b < d; b++) {
                        c = a.aoColumns[b].nTh;
                        c.innerHTML = a.aoColumns[b].sTitle;
                        c.setAttribute("tabindex", "0");
                        a.aoColumns[b].sClass !== null && i(c).addClass(a.aoColumns[b].sClass);
                        e.appendChild(c)
                    }
                    i(a.nTHead).html("")[0].appendChild(e);
                    ha(a.aoHeader, a.nTHead)
                }
                i(a.nTHead).children("tr").attr("role", "row");
                if (a.bJUI) {
                    b = 0;
                    for (d = a.aoColumns.length; b <
                    d; b++) {
                        c = a.aoColumns[b].nTh;
                        e = s.createElement("div");
                        e.className = a.oClasses.sSortJUIWrapper;
                        i(c).contents().appendTo(e);
                        var f = s.createElement("span");
                        f.className = a.oClasses.sSortIcon;
                        e.appendChild(f);
                        c.appendChild(e)
                    }
                }
                if (a.oFeatures.bSort) for (b = 0; b < a.aoColumns.length; b++) a.aoColumns[b].bSortable !== false ? ya(a, a.aoColumns[b].nTh, b) : i(a.aoColumns[b].nTh).addClass(a.oClasses.sSortableNone);
                a.oClasses.sFooterTH !== "" && i(a.nTFoot).children("tr").children("th").addClass(a.oClasses.sFooterTH);
                if (a.nTFoot !==
                    null) {
                    c = Z(a, null, a.aoFooter);
                    b = 0;
                    for (d = a.aoColumns.length; b < d; b++) if (c[b]) {
                        a.aoColumns[b].nTf = c[b];
                        a.aoColumns[b].sClass && i(c[b]).addClass(a.aoColumns[b].sClass)
                    }
                }
            }

            function ia(a, b, c) {
                var d, e, f, g = [], j = [], k = a.aoColumns.length, m;
                if (c === p) c = false;
                d = 0;
                for (e = b.length; d < e; d++) {
                    g[d] = b[d].slice();
                    g[d].nTr = b[d].nTr;
                    for (f = k - 1; f >= 0; f--) !a.aoColumns[f].bVisible && !c && g[d].splice(f, 1);
                    j.push([])
                }
                d = 0;
                for (e = g.length; d < e; d++) {
                    if (a = g[d].nTr) for (; f = a.firstChild;) a.removeChild(f);
                    f = 0;
                    for (b = g[d].length; f < b; f++) {
                        m = k = 1;
                        if (j[d][f] === p) {
                            a.appendChild(g[d][f].cell);
                            for (j[d][f] = 1; g[d + k] !== p && g[d][f].cell == g[d + k][f].cell;) {
                                j[d + k][f] = 1;
                                k++
                            }
                            for (; g[d][f + m] !== p && g[d][f].cell == g[d][f + m].cell;) {
                                for (c = 0; c < k; c++) j[d + c][f + m] = 1;
                                m++
                            }
                            g[d][f].cell.rowSpan = k;
                            g[d][f].cell.colSpan = m
                        }
                    }
                }
            }

            function H(a) {
                var b = K(a, "aoPreDrawCallback", "preDraw", [a]);
                if (i.inArray(false, b) !== -1) P(a, false); else {
                    var c, d;
                    b = [];
                    var e = 0, f = a.asStripeClasses.length;
                    c = a.aoOpenRows.length;
                    a.bDrawing = true;
                    if (a.iInitDisplayStart !== p && a.iInitDisplayStart != -1) {
                        a._iDisplayStart =
                            a.oFeatures.bServerSide ? a.iInitDisplayStart : a.iInitDisplayStart >= a.fnRecordsDisplay() ? 0 : a.iInitDisplayStart;
                        a.iInitDisplayStart = -1;
                        I(a)
                    }
                    if (a.bDeferLoading) {
                        a.bDeferLoading = false;
                        a.iDraw++
                    } else if (a.oFeatures.bServerSide) {
                        if (!a.bDestroying && !La(a)) return
                    } else a.iDraw++;
                    if (a.aiDisplay.length !== 0) {
                        var g = a._iDisplayStart;
                        d = a._iDisplayEnd;
                        if (a.oFeatures.bServerSide) {
                            g = 0;
                            d = a.aoData.length
                        }
                        for (g = g; g < d; g++) {
                            var j = a.aoData[a.aiDisplay[g]];
                            j.nTr === null && ua(a, a.aiDisplay[g]);
                            var k = j.nTr;
                            if (f !== 0) {
                                var m = a.asStripeClasses[e %
                                f];
                                if (j._sRowStripe != m) {
                                    i(k).removeClass(j._sRowStripe).addClass(m);
                                    j._sRowStripe = m
                                }
                            }
                            K(a, "aoRowCallback", null, [k, a.aoData[a.aiDisplay[g]]._aData, e, g]);
                            b.push(k);
                            e++;
                            if (c !== 0) for (j = 0; j < c; j++) if (k == a.aoOpenRows[j].nParent) {
                                b.push(a.aoOpenRows[j].nTr);
                                break
                            }
                        }
                    } else {
                        b[0] = s.createElement("tr");
                        if (a.asStripeClasses[0]) b[0].className = a.asStripeClasses[0];
                        c = a.oLanguage;
                        f = c.sZeroRecords;
                        if (a.iDraw == 1 && a.sAjaxSource !== null && !a.oFeatures.bServerSide) f = c.sLoadingRecords; else if (c.sEmptyTable && a.fnRecordsTotal() ===
                            0) f = c.sEmptyTable;
                        c = s.createElement("td");
                        c.setAttribute("valign", "top");
                        c.colSpan = D(a);
                        c.className = a.oClasses.sRowEmpty;
                        c.innerHTML = za(a, f);
                        b[e].appendChild(c)
                    }
                    K(a, "aoHeaderCallback", "header", [i(a.nTHead).children("tr")[0], oa(a), a._iDisplayStart, a.fnDisplayEnd(), a.aiDisplay]);
                    K(a, "aoFooterCallback", "footer", [i(a.nTFoot).children("tr")[0], oa(a), a._iDisplayStart, a.fnDisplayEnd(), a.aiDisplay]);
                    e = s.createDocumentFragment();
                    c = s.createDocumentFragment();
                    if (a.nTBody) {
                        f = a.nTBody.parentNode;
                        c.appendChild(a.nTBody);
                        if (!a.oScroll.bInfinite || !a._bInitComplete || a.bSorted || a.bFiltered) for (; c = a.nTBody.firstChild;) a.nTBody.removeChild(c);
                        c = 0;
                        for (d = b.length; c < d; c++) e.appendChild(b[c]);
                        a.nTBody.appendChild(e);
                        f !== null && f.appendChild(a.nTBody)
                    }
                    K(a, "aoDrawCallback", "draw", [a]);
                    a.bSorted = false;
                    a.bFiltered = false;
                    a.bDrawing = false;
                    if (a.oFeatures.bServerSide) {
                        P(a, false);
                        a._bInitComplete || pa(a)
                    }
                }
            }

            function qa(a) {
                if (a.oFeatures.bSort) $(a, a.oPreviousSearch); else if (a.oFeatures.bFilter) X(a, a.oPreviousSearch); else {
                    I(a);
                    H(a)
                }
            }

            function Ma(a) {
                var b =
                    i("<div></div>")[0];
                a.nTable.parentNode.insertBefore(b, a.nTable);
                a.nTableWrapper = i('<div id="' + a.sTableId + '_wrapper" class="' + a.oClasses.sWrapper + '" role="grid"></div>')[0];
                a.nTableReinsertBefore = a.nTable.nextSibling;
                for (var c = a.nTableWrapper, d = a.sDom.split(""), e, f, g, j, k, m, u, x = 0; x < d.length; x++) {
                    f = 0;
                    g = d[x];
                    if (g == "<") {
                        j = i("<div></div>")[0];
                        k = d[x + 1];
                        if (k == "'" || k == '"') {
                            m = "";
                            for (u = 2; d[x + u] != k;) {
                                m += d[x + u];
                                u++
                            }
                            if (m == "H") m = a.oClasses.sJUIHeader; else if (m == "F") m = a.oClasses.sJUIFooter;
                            if (m.indexOf(".") != -1) {
                                k =
                                    m.split(".");
                                j.id = k[0].substr(1, k[0].length - 1);
                                j.className = k[1]
                            } else if (m.charAt(0) == "#") j.id = m.substr(1, m.length - 1); else j.className = m;
                            x += u
                        }
                        c.appendChild(j);
                        c = j
                    } else if (g == ">") c = c.parentNode; else if (g == "l" && a.oFeatures.bPaginate && a.oFeatures.bLengthChange) {
                        e = Na(a);
                        f = 1
                    } else if (g == "f" && a.oFeatures.bFilter) {
                        e = Oa(a);
                        f = 1
                    } else if (g == "r" && a.oFeatures.bProcessing) {
                        e = Pa(a);
                        f = 1
                    } else if (g == "t") {
                        e = Qa(a);
                        f = 1
                    } else if (g == "i" && a.oFeatures.bInfo) {
                        e = Ra(a);
                        f = 1
                    } else if (g == "p" && a.oFeatures.bPaginate) {
                        e = Sa(a);
                        f = 1
                    } else if (l.ext.aoFeatures.length !==
                        0) {
                        j = l.ext.aoFeatures;
                        u = 0;
                        for (k = j.length; u < k; u++) if (g == j[u].cFeature) {
                            if (e = j[u].fnInit(a)) f = 1;
                            break
                        }
                    }
                    if (f == 1 && e !== null) {
                        if (typeof a.aanFeatures[g] !== "object") a.aanFeatures[g] = [];
                        a.aanFeatures[g].push(e);
                        c.appendChild(e)
                    }
                }
                b.parentNode.replaceChild(a.nTableWrapper, b)
            }

            function ha(a, b) {
                b = i(b).children("tr");
                var c, d, e, f, g, j, k, m, u, x, y = function (B, T, M) {
                    for (B = B[T]; B[M];) M++;
                    return M
                };
                a.splice(0, a.length);
                e = 0;
                for (j = b.length; e < j; e++) a.push([]);
                e = 0;
                for (j = b.length; e < j; e++) {
                    c = b[e];
                    for (d = c.firstChild; d;) {
                        if (d.nodeName.toUpperCase() ==
                            "TD" || d.nodeName.toUpperCase() == "TH") {
                            m = d.getAttribute("colspan") * 1;
                            u = d.getAttribute("rowspan") * 1;
                            m = !m || m === 0 || m === 1 ? 1 : m;
                            u = !u || u === 0 || u === 1 ? 1 : u;
                            k = y(a, e, 0);
                            x = m === 1 ? true : false;
                            for (g = 0; g < m; g++) for (f = 0; f < u; f++) {
                                a[e + f][k + g] = {cell: d, unique: x};
                                a[e + f].nTr = c
                            }
                        }
                        d = d.nextSibling
                    }
                }
            }

            function Z(a, b, c) {
                var d = [];
                if (!c) {
                    c = a.aoHeader;
                    if (b) {
                        c = [];
                        ha(c, b)
                    }
                }
                b = 0;
                for (var e = c.length; b < e; b++) for (var f = 0, g = c[b].length; f < g; f++) if (c[b][f].unique && (!d[f] || !a.bSortCellsTop)) d[f] = c[b][f].cell;
                return d
            }

            function La(a) {
                if (a.bAjaxDataGet) {
                    a.iDraw++;
                    P(a, true);
                    var b = Ta(a);
                    Aa(a, b);
                    a.fnServerData.call(a.oInstance, a.sAjaxSource, b, function (c) {
                        Ua(a, c)
                    }, a);
                    return false
                } else return true
            }

            function Ta(a) {
                var b = a.aoColumns.length, c = [], d, e, f, g;
                c.push({name: "sEcho", value: a.iDraw});
                c.push({name: "iColumns", value: b});
                c.push({name: "sColumns", value: Y(a)});
                c.push({name: "iDisplayStart", value: a._iDisplayStart});
                c.push({name: "iDisplayLength", value: a.oFeatures.bPaginate !== false ? a._iDisplayLength : -1});
                for (f = 0; f < b; f++) {
                    d = a.aoColumns[f].mData;
                    c.push({
                        name: "mDataProp_" +
                        f, value: typeof d === "function" ? "function" : d
                    })
                }
                if (a.oFeatures.bFilter !== false) {
                    c.push({name: "sSearch", value: a.oPreviousSearch.sSearch});
                    c.push({name: "bRegex", value: a.oPreviousSearch.bRegex});
                    for (f = 0; f < b; f++) {
                        c.push({name: "sSearch_" + f, value: a.aoPreSearchCols[f].sSearch});
                        c.push({name: "bRegex_" + f, value: a.aoPreSearchCols[f].bRegex});
                        c.push({name: "bSearchable_" + f, value: a.aoColumns[f].bSearchable})
                    }
                }
                if (a.oFeatures.bSort !== false) {
                    var j = 0;
                    d = a.aaSortingFixed !== null ? a.aaSortingFixed.concat(a.aaSorting) : a.aaSorting.slice();
                    for (f = 0; f < d.length; f++) {
                        e = a.aoColumns[d[f][0]].aDataSort;
                        for (g = 0; g < e.length; g++) {
                            c.push({name: "iSortCol_" + j, value: e[g]});
                            c.push({name: "sSortDir_" + j, value: d[f][1]});
                            j++
                        }
                    }
                    c.push({name: "iSortingCols", value: j});
                    for (f = 0; f < b; f++) c.push({name: "bSortable_" + f, value: a.aoColumns[f].bSortable})
                }
                return c
            }

            function Aa(a, b) {
                K(a, "aoServerParams", "serverParams", [b])
            }

            function Ua(a, b) {
                if (b.sEcho !== p) if (b.sEcho * 1 < a.iDraw) return; else a.iDraw = b.sEcho * 1;
                if (!a.oScroll.bInfinite || a.oScroll.bInfinite && (a.bSorted || a.bFiltered)) wa(a);
                a._iRecordsTotal = parseInt(b.iTotalRecords, 10);
                a._iRecordsDisplay = parseInt(b.iTotalDisplayRecords, 10);
                var c = Y(a);
                c = b.sColumns !== p && c !== "" && b.sColumns != c;
                var d;
                if (c) d = E(a, b.sColumns);
                b = ca(a.sAjaxDataProp)(b);
                for (var e = 0, f = b.length; e < f; e++) if (c) {
                    for (var g = [], j = 0, k = a.aoColumns.length; j < k; j++) g.push(b[e][d[j]]);
                    R(a, g)
                } else R(a, b[e]);
                a.aiDisplay = a.aiDisplayMaster.slice();
                a.bAjaxDataGet = false;
                H(a);
                a.bAjaxDataGet = true;
                P(a, false)
            }

            function Oa(a) {
                var b = a.oPreviousSearch, c = a.oLanguage.sSearch;
                c = c.indexOf("_INPUT_") !==
                -1 ? c.replace("_INPUT_", '<input type="text" />') : c === "" ? '<input type="text" />' : c + ' <input type="text" />';
                var d = s.createElement("div");
                d.className = a.oClasses.sFilter;
                d.innerHTML = "<label>" + c + "</label>";
                if (!a.aanFeatures.f) d.id = a.sTableId + "_filter";
                c = i('input[type="text"]', d);
                d._DT_Input = c[0];
                c.val(b.sSearch.replace('"', "&quot;"));
                c.bind("keyup.DT", function () {
                    for (var e = a.aanFeatures.f, f = this.value === "" ? "" : this.value, g = 0, j = e.length; g < j; g++) e[g] != i(this).parents("div.dataTables_filter")[0] && i(e[g]._DT_Input).val(f);
                    f != b.sSearch && X(a, {
                        sSearch: f,
                        bRegex: b.bRegex,
                        bSmart: b.bSmart,
                        bCaseInsensitive: b.bCaseInsensitive
                    })
                });
                c.attr("aria-controls", a.sTableId).bind("keypress.DT", function (e) {
                    if (e.keyCode == 13) return false
                });
                return d
            }

            function X(a, b, c) {
                var d = a.oPreviousSearch, e = a.aoPreSearchCols, f = function (g) {
                    d.sSearch = g.sSearch;
                    d.bRegex = g.bRegex;
                    d.bSmart = g.bSmart;
                    d.bCaseInsensitive = g.bCaseInsensitive
                };
                if (a.oFeatures.bServerSide) f(b); else {
                    Va(a, b.sSearch, c, b.bRegex, b.bSmart, b.bCaseInsensitive);
                    f(b);
                    for (b = 0; b < a.aoPreSearchCols.length; b++) Wa(a,
                        e[b].sSearch, b, e[b].bRegex, e[b].bSmart, e[b].bCaseInsensitive);
                    Xa(a)
                }
                a.bFiltered = true;
                i(a.oInstance).trigger("filter", a);
                a._iDisplayStart = 0;
                I(a);
                H(a);
                Ba(a, 0)
            }

            function Xa(a) {
                for (var b = l.ext.afnFiltering, c = A(a, "bSearchable"), d = 0, e = b.length; d < e; d++) for (var f = 0, g = 0, j = a.aiDisplay.length; g < j; g++) {
                    var k = a.aiDisplay[g - f];
                    if (!b[d](a, na(a, k, "filter", c), k)) {
                        a.aiDisplay.splice(g - f, 1);
                        f++
                    }
                }
            }

            function Wa(a, b, c, d, e, f) {
                if (b !== "") {
                    var g = 0;
                    b = Ca(b, d, e, f);
                    for (d = a.aiDisplay.length - 1; d >= 0; d--) {
                        e = Ya(F(a, a.aiDisplay[d], c,
                            "filter"), a.aoColumns[c].sType);
                        if (!b.test(e)) {
                            a.aiDisplay.splice(d, 1);
                            g++
                        }
                    }
                }
            }

            function Va(a, b, c, d, e, f) {
                d = Ca(b, d, e, f);
                e = a.oPreviousSearch;
                c || (c = 0);
                if (l.ext.afnFiltering.length !== 0) c = 1;
                if (b.length <= 0) {
                    a.aiDisplay.splice(0, a.aiDisplay.length);
                    a.aiDisplay = a.aiDisplayMaster.slice()
                } else if (a.aiDisplay.length == a.aiDisplayMaster.length || e.sSearch.length > b.length || c == 1 || b.indexOf(e.sSearch) !== 0) {
                    a.aiDisplay.splice(0, a.aiDisplay.length);
                    Ba(a, 1);
                    for (b = 0; b < a.aiDisplayMaster.length; b++) d.test(a.asDataSearch[b]) &&
                    a.aiDisplay.push(a.aiDisplayMaster[b])
                } else for (b = c = 0; b < a.asDataSearch.length; b++) if (!d.test(a.asDataSearch[b])) {
                    a.aiDisplay.splice(b - c, 1);
                    c++
                }
            }

            function Ba(a, b) {
                if (!a.oFeatures.bServerSide) {
                    a.asDataSearch = [];
                    var c = A(a, "bSearchable");
                    b = b === 1 ? a.aiDisplayMaster : a.aiDisplay;
                    for (var d = 0, e = b.length; d < e; d++) a.asDataSearch[d] = Da(a, na(a, b[d], "filter", c))
                }
            }

            function Da(a, b) {
                a = b.join("  ");
                if (a.indexOf("&") !== -1) a = i("<div>").html(a).text();
                return a.replace(/[\n\r]/g, " ")
            }

            function Ca(a, b, c, d) {
                if (c) {
                    a = b ? a.split(" ") :
                        Ea(a).split(" ");
                    a = "^(?=.*?" + a.join(")(?=.*?") + ").*$";
                    return new RegExp(a, d ? "i" : "")
                } else {
                    a = b ? a : Ea(a);
                    return new RegExp(a, d ? "i" : "")
                }
            }

            function Ya(a, b) {
                if (typeof l.ext.ofnSearch[b] === "function") return l.ext.ofnSearch[b](a); else if (a === null) return ""; else if (b == "html") return a.replace(/[\r\n]/g, " ").replace(/<.*?>/g, ""); else if (typeof a === "string") return a.replace(/[\r\n]/g, " ");
                return a
            }

            function Ea(a) {
                return a.replace(new RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)", "g"),
                    "\\$1")
            }

            function Ra(a) {
                var b = s.createElement("div");
                b.className = a.oClasses.sInfo;
                if (!a.aanFeatures.i) {
                    a.aoDrawCallback.push({fn: Za, sName: "information"});
                    b.id = a.sTableId + "_info"
                }
                a.nTable.setAttribute("aria-describedby", a.sTableId + "_info");
                return b
            }

            function Za(a) {
                if (!(!a.oFeatures.bInfo || a.aanFeatures.i.length === 0)) {
                    var b = a.oLanguage, c = a._iDisplayStart + 1, d = a.fnDisplayEnd(), e = a.fnRecordsTotal(),
                        f = a.fnRecordsDisplay(), g;
                    g = f === 0 ? b.sInfoEmpty : b.sInfo;
                    if (f != e) g += " " + b.sInfoFiltered;
                    g += b.sInfoPostFix;
                    g = za(a,
                        g);
                    if (b.fnInfoCallback !== null) g = b.fnInfoCallback.call(a.oInstance, a, c, d, e, f, g);
                    a = a.aanFeatures.i;
                    b = 0;
                    for (c = a.length; b < c; b++) i(a[b]).html(g)
                }
            }

            function za(a, b) {
                var c = a.fnFormatNumber(a._iDisplayStart + 1), d = a.fnDisplayEnd();
                d = a.fnFormatNumber(d);
                var e = a.fnRecordsDisplay();
                e = a.fnFormatNumber(e);
                var f = a.fnRecordsTotal();
                f = a.fnFormatNumber(f);
                if (a.oScroll.bInfinite) c = a.fnFormatNumber(1);
                return b.replace(/_START_/g, c).replace(/_END_/g, d).replace(/_TOTAL_/g, e).replace(/_MAX_/g, f)
            }

            function ra(a) {
                var b, c, d =
                    a.iInitDisplayStart;
                if (a.bInitialised === false) setTimeout(function () {
                    ra(a)
                }, 200); else {
                    Ma(a);
                    Ka(a);
                    ia(a, a.aoHeader);
                    a.nTFoot && ia(a, a.aoFooter);
                    P(a, true);
                    a.oFeatures.bAutoWidth && ta(a);
                    b = 0;
                    for (c = a.aoColumns.length; b < c; b++) if (a.aoColumns[b].sWidth !== null) a.aoColumns[b].nTh.style.width = t(a.aoColumns[b].sWidth);
                    if (a.oFeatures.bSort) $(a); else if (a.oFeatures.bFilter) X(a, a.oPreviousSearch); else {
                        a.aiDisplay = a.aiDisplayMaster.slice();
                        I(a);
                        H(a)
                    }
                    if (a.sAjaxSource !== null && !a.oFeatures.bServerSide) {
                        c = [];
                        Aa(a, c);
                        a.fnServerData.call(a.oInstance,
                            a.sAjaxSource, c, function (e) {
                                var f = a.sAjaxDataProp !== "" ? ca(a.sAjaxDataProp)(e) : e;
                                for (b = 0; b < f.length; b++) R(a, f[b]);
                                a.iInitDisplayStart = d;
                                if (a.oFeatures.bSort) $(a); else {
                                    a.aiDisplay = a.aiDisplayMaster.slice();
                                    I(a);
                                    H(a)
                                }
                                P(a, false);
                                pa(a, e)
                            }, a)
                    } else if (!a.oFeatures.bServerSide) {
                        P(a, false);
                        pa(a)
                    }
                }
            }

            function pa(a, b) {
                a._bInitComplete = true;
                K(a, "aoInitComplete", "init", [a, b])
            }

            function Fa(a) {
                var b = l.defaults.oLanguage;
                !a.sEmptyTable && a.sZeroRecords && b.sEmptyTable === "No data available in table" && r(a, a, "sZeroRecords",
                    "sEmptyTable");
                !a.sLoadingRecords && a.sZeroRecords && b.sLoadingRecords === "Loading..." && r(a, a, "sZeroRecords", "sLoadingRecords")
            }

            function Na(a) {
                if (a.oScroll.bInfinite) return null;
                var b = '<select size="1" ' + ('name="' + a.sTableId + '_length"') + ">", c, d, e = a.aLengthMenu;
                if (e.length == 2 && typeof e[0] === "object" && typeof e[1] === "object") {
                    c = 0;
                    for (d = e[0].length; c < d; c++) b += '<option value="' + e[0][c] + '">' + e[1][c] + "</option>"
                } else {
                    c = 0;
                    for (d = e.length; c < d; c++) b += '<option value="' + e[c] + '">' + e[c] + "</option>"
                }
                b += "</select>";
                e = s.createElement("div");
                if (!a.aanFeatures.l) e.id = a.sTableId + "_length";
                e.className = a.oClasses.sLength;
                e.innerHTML = "<label>" + a.oLanguage.sLengthMenu.replace("_MENU_", b) + "</label>";
                i('select option[value="' + a._iDisplayLength + '"]', e).attr("selected", true);
                i("select", e).bind("change.DT", function () {
                    var f = i(this).val(), g = a.aanFeatures.l;
                    c = 0;
                    for (d = g.length; c < d; c++) g[c] != this.parentNode && i("select", g[c]).val(f);
                    a._iDisplayLength = parseInt(f, 10);
                    I(a);
                    if (a.fnDisplayEnd() == a.fnRecordsDisplay()) {
                        a._iDisplayStart =
                            a.fnDisplayEnd() - a._iDisplayLength;
                        if (a._iDisplayStart < 0) a._iDisplayStart = 0
                    }
                    if (a._iDisplayLength == -1) a._iDisplayStart = 0;
                    H(a)
                });
                i("select", e).attr("aria-controls", a.sTableId);
                return e
            }

            function I(a) {
                a._iDisplayEnd = a.oFeatures.bPaginate === false ? a.aiDisplay.length : a._iDisplayStart + a._iDisplayLength > a.aiDisplay.length || a._iDisplayLength == -1 ? a.aiDisplay.length : a._iDisplayStart + a._iDisplayLength
            }

            function Sa(a) {
                if (a.oScroll.bInfinite) return null;
                var b = s.createElement("div");
                b.className = a.oClasses.sPaging +
                    a.sPaginationType;
                l.ext.oPagination[a.sPaginationType].fnInit(a, b, function (c) {
                    I(c);
                    H(c)
                });
                a.aanFeatures.p || a.aoDrawCallback.push({
                    fn: function (c) {
                        l.ext.oPagination[c.sPaginationType].fnUpdate(c, function (d) {
                            I(d);
                            H(d)
                        })
                    }, sName: "pagination"
                });
                return b
            }

            function Ga(a, b) {
                var c = a._iDisplayStart;
                if (typeof b === "number") {
                    a._iDisplayStart = b * a._iDisplayLength;
                    if (a._iDisplayStart > a.fnRecordsDisplay()) a._iDisplayStart = 0
                } else if (b == "first") a._iDisplayStart = 0; else if (b == "previous") {
                    a._iDisplayStart = a._iDisplayLength >=
                    0 ? a._iDisplayStart - a._iDisplayLength : 0;
                    if (a._iDisplayStart < 0) a._iDisplayStart = 0
                } else if (b == "next") if (a._iDisplayLength >= 0) {
                    if (a._iDisplayStart + a._iDisplayLength < a.fnRecordsDisplay()) a._iDisplayStart += a._iDisplayLength
                } else a._iDisplayStart = 0; else if (b == "last") if (a._iDisplayLength >= 0) {
                    b = parseInt((a.fnRecordsDisplay() - 1) / a._iDisplayLength, 10) + 1;
                    a._iDisplayStart = (b - 1) * a._iDisplayLength
                } else a._iDisplayStart = 0; else O(a, 0, "Unknown paging action: " + b);
                i(a.oInstance).trigger("page", a);
                return c != a._iDisplayStart
            }

            function Pa(a) {
                var b = s.createElement("div");
                if (!a.aanFeatures.r) b.id = a.sTableId + "_processing";
                b.innerHTML = a.oLanguage.sProcessing;
                b.className = a.oClasses.sProcessing;
                a.nTable.parentNode.insertBefore(b, a.nTable);
                return b
            }

            function P(a, b) {
                if (a.oFeatures.bProcessing) for (var c = a.aanFeatures.r, d = 0, e = c.length; d < e; d++) c[d].style.visibility = b ? "visible" : "hidden";
                i(a.oInstance).trigger("processing", [a, b])
            }

            function Qa(a) {
                if (a.oScroll.sX === "" && a.oScroll.sY === "") return a.nTable;
                var b = s.createElement("div"), c = s.createElement("div"),
                    d = s.createElement("div"), e = s.createElement("div"), f = s.createElement("div"),
                    g = s.createElement("div"), j = a.nTable.cloneNode(false), k = a.nTable.cloneNode(false),
                    m = a.nTable.getElementsByTagName("thead")[0],
                    u = a.nTable.getElementsByTagName("tfoot").length === 0 ? null : a.nTable.getElementsByTagName("tfoot")[0],
                    x = a.oClasses;
                c.appendChild(d);
                f.appendChild(g);
                e.appendChild(a.nTable);
                b.appendChild(c);
                b.appendChild(e);
                d.appendChild(j);
                j.appendChild(m);
                if (u !== null) {
                    b.appendChild(f);
                    g.appendChild(k);
                    k.appendChild(u)
                }
                b.className =
                    x.sScrollWrapper;
                c.className = x.sScrollHead;
                d.className = x.sScrollHeadInner;
                e.className = x.sScrollBody;
                f.className = x.sScrollFoot;
                g.className = x.sScrollFootInner;
                if (a.oScroll.bAutoCss) {
                    c.style.overflow = "hidden";
                    c.style.position = "relative";
                    f.style.overflow = "hidden";
                    e.style.overflow = "auto"
                }
                c.style.border = "0";
                c.style.width = "100%";
                f.style.border = "0";
                d.style.width = a.oScroll.sXInner !== "" ? a.oScroll.sXInner : "100%";
                j.removeAttribute("id");
                j.style.marginLeft = "0";
                a.nTable.style.marginLeft = "0";
                if (u !== null) {
                    k.removeAttribute("id");
                    k.style.marginLeft = "0"
                }
                d = i(a.nTable).children("caption");
                if (d.length > 0) {
                    d = d[0];
                    if (d._captionSide === "top") j.appendChild(d); else d._captionSide === "bottom" && u && k.appendChild(d)
                }
                if (a.oScroll.sX !== "") {
                    c.style.width = t(a.oScroll.sX);
                    e.style.width = t(a.oScroll.sX);
                    if (u !== null) f.style.width = t(a.oScroll.sX);
                    i(e).scroll(function () {
                        c.scrollLeft = this.scrollLeft;
                        if (u !== null) f.scrollLeft = this.scrollLeft
                    })
                }
                if (a.oScroll.sY !== "") e.style.height = t(a.oScroll.sY);
                a.aoDrawCallback.push({fn: $a, sName: "scrolling"});
                a.oScroll.bInfinite &&
                i(e).scroll(function () {
                    if (!a.bDrawing && i(this).scrollTop() !== 0) if (i(this).scrollTop() + i(this).height() > i(a.nTable).height() - a.oScroll.iLoadGap) if (a.fnDisplayEnd() < a.fnRecordsDisplay()) {
                        Ga(a, "next");
                        I(a);
                        H(a)
                    }
                });
                a.nScrollHead = c;
                a.nScrollFoot = f;
                return b
            }

            function $a(a) {
                var b = a.nScrollHead.getElementsByTagName("div")[0], c = b.getElementsByTagName("table")[0],
                    d = a.nTable.parentNode, e, f, g, j, k, m, u, x, y = [], B = [],
                    T = a.nTFoot !== null ? a.nScrollFoot.getElementsByTagName("div")[0] : null,
                    M = a.nTFoot !== null ? T.getElementsByTagName("table")[0] :
                        null, L = a.oBrowser.bScrollOversize, ja = function (z) {
                        u = z.style;
                        u.paddingTop = "0";
                        u.paddingBottom = "0";
                        u.borderTopWidth = "0";
                        u.borderBottomWidth = "0";
                        u.height = 0
                    };
                i(a.nTable).children("thead, tfoot").remove();
                e = i(a.nTHead).clone()[0];
                a.nTable.insertBefore(e, a.nTable.childNodes[0]);
                g = a.nTHead.getElementsByTagName("tr");
                j = e.getElementsByTagName("tr");
                if (a.nTFoot !== null) {
                    k = i(a.nTFoot).clone()[0];
                    a.nTable.insertBefore(k, a.nTable.childNodes[1]);
                    m = a.nTFoot.getElementsByTagName("tr");
                    k = k.getElementsByTagName("tr")
                }
                if (a.oScroll.sX ===
                    "") {
                    d.style.width = "100%";
                    b.parentNode.style.width = "100%"
                }
                var U = Z(a, e);
                e = 0;
                for (f = U.length; e < f; e++) {
                    x = v(a, e);
                    U[e].style.width = a.aoColumns[x].sWidth
                }
                a.nTFoot !== null && N(function (z) {
                    z.style.width = ""
                }, k);
                if (a.oScroll.bCollapse && a.oScroll.sY !== "") d.style.height = d.offsetHeight + a.nTHead.offsetHeight + "px";
                e = i(a.nTable).outerWidth();
                if (a.oScroll.sX === "") {
                    a.nTable.style.width = "100%";
                    if (L && (i("tbody", d).height() > d.offsetHeight || i(d).css("overflow-y") == "scroll")) a.nTable.style.width = t(i(a.nTable).outerWidth() -
                        a.oScroll.iBarWidth)
                } else if (a.oScroll.sXInner !== "") a.nTable.style.width = t(a.oScroll.sXInner); else if (e == i(d).width() && i(d).height() < i(a.nTable).height()) {
                    a.nTable.style.width = t(e - a.oScroll.iBarWidth);
                    if (i(a.nTable).outerWidth() > e - a.oScroll.iBarWidth) a.nTable.style.width = t(e)
                } else a.nTable.style.width = t(e);
                e = i(a.nTable).outerWidth();
                N(ja, j);
                N(function (z) {
                    y.push(t(i(z).width()))
                }, j);
                N(function (z, Q) {
                    z.style.width = y[Q]
                }, g);
                i(j).height(0);
                if (a.nTFoot !== null) {
                    N(ja, k);
                    N(function (z) {
                            B.push(t(i(z).width()))
                        },
                        k);
                    N(function (z, Q) {
                        z.style.width = B[Q]
                    }, m);
                    i(k).height(0)
                }
                N(function (z, Q) {
                    z.innerHTML = "";
                    z.style.width = y[Q]
                }, j);
                a.nTFoot !== null && N(function (z, Q) {
                    z.innerHTML = "";
                    z.style.width = B[Q]
                }, k);
                if (i(a.nTable).outerWidth() < e) {
                    g = d.scrollHeight > d.offsetHeight || i(d).css("overflow-y") == "scroll" ? e + a.oScroll.iBarWidth : e;
                    if (L && (d.scrollHeight > d.offsetHeight || i(d).css("overflow-y") == "scroll")) a.nTable.style.width = t(g - a.oScroll.iBarWidth);
                    d.style.width = t(g);
                    a.nScrollHead.style.width = t(g);
                    if (a.nTFoot !== null) a.nScrollFoot.style.width =
                        t(g);
                    if (a.oScroll.sX === "") O(a, 1, "The table cannot fit into the current element which will cause column misalignment. The table has been drawn at its minimum possible width."); else a.oScroll.sXInner !== "" && O(a, 1, "The table cannot fit into the current element which will cause column misalignment. Increase the sScrollXInner value or remove it to allow automatic calculation")
                } else {
                    d.style.width = t("100%");
                    a.nScrollHead.style.width = t("100%");
                    if (a.nTFoot !== null) a.nScrollFoot.style.width = t("100%")
                }
                if (a.oScroll.sY ===
                    "") if (L) d.style.height = t(a.nTable.offsetHeight + a.oScroll.iBarWidth);
                if (a.oScroll.sY !== "" && a.oScroll.bCollapse) {
                    d.style.height = t(a.oScroll.sY);
                    L = a.oScroll.sX !== "" && a.nTable.offsetWidth > d.offsetWidth ? a.oScroll.iBarWidth : 0;
                    if (a.nTable.offsetHeight < d.offsetHeight) d.style.height = t(a.nTable.offsetHeight + L)
                }
                L = i(a.nTable).outerWidth();
                c.style.width = t(L);
                b.style.width = t(L);
                c = i(a.nTable).height() > d.clientHeight || i(d).css("overflow-y") == "scroll";
                b.style.paddingRight = c ? a.oScroll.iBarWidth + "px" : "0px";
                if (a.nTFoot !==
                    null) {
                    M.style.width = t(L);
                    T.style.width = t(L);
                    T.style.paddingRight = c ? a.oScroll.iBarWidth + "px" : "0px"
                }
                i(d).scroll();
                if (a.bSorted || a.bFiltered) d.scrollTop = 0
            }

            function N(a, b, c) {
                for (var d = 0, e = 0, f = b.length, g, j; e < f;) {
                    g = b[e].firstChild;
                    for (j = c ? c[e].firstChild : null; g;) {
                        if (g.nodeType === 1) {
                            c ? a(g, j, d) : a(g, d);
                            d++
                        }
                        g = g.nextSibling;
                        j = c ? j.nextSibling : null
                    }
                    e++
                }
            }

            function ab(a, b) {
                if (!a || a === null || a === "") return 0;
                if (!b) b = s.body;
                var c = s.createElement("div");
                c.style.width = t(a);
                b.appendChild(c);
                a = c.offsetWidth;
                b.removeChild(c);
                return a
            }

            function ta(a) {
                var b = 0, c, d = 0, e = a.aoColumns.length, f, g, j = i("th", a.nTHead),
                    k = a.nTable.getAttribute("width");
                g = a.nTable.parentNode;
                for (f = 0; f < e; f++) if (a.aoColumns[f].bVisible) {
                    d++;
                    if (a.aoColumns[f].sWidth !== null) {
                        c = ab(a.aoColumns[f].sWidthOrig, g);
                        if (c !== null) a.aoColumns[f].sWidth = t(c);
                        b++
                    }
                }
                if (e == j.length && b === 0 && d == e && a.oScroll.sX === "" && a.oScroll.sY === "") for (f = 0; f < a.aoColumns.length; f++) {
                    c = i(j[f]).width();
                    if (c !== null) a.aoColumns[f].sWidth = t(c)
                } else {
                    b = a.nTable.cloneNode(false);
                    f = a.nTHead.cloneNode(true);
                    d = s.createElement("tbody");
                    c = s.createElement("tr");
                    b.removeAttribute("id");
                    b.appendChild(f);
                    if (a.nTFoot !== null) {
                        b.appendChild(a.nTFoot.cloneNode(true));
                        N(function (u) {
                            u.style.width = ""
                        }, b.getElementsByTagName("tr"))
                    }
                    b.appendChild(d);
                    d.appendChild(c);
                    d = i("thead th", b);
                    if (d.length === 0) d = i("tbody tr:eq(0)>td", b);
                    j = Z(a, f);
                    for (f = d = 0; f < e; f++) {
                        var m = a.aoColumns[f];
                        if (m.bVisible && m.sWidthOrig !== null && m.sWidthOrig !== "") j[f - d].style.width = t(m.sWidthOrig); else if (m.bVisible) j[f - d].style.width = ""; else d++
                    }
                    for (f =
                             0; f < e; f++) if (a.aoColumns[f].bVisible) {
                        d = bb(a, f);
                        if (d !== null) {
                            d = d.cloneNode(true);
                            if (a.aoColumns[f].sContentPadding !== "") d.innerHTML += a.aoColumns[f].sContentPadding;
                            c.appendChild(d)
                        }
                    }
                    g.appendChild(b);
                    if (a.oScroll.sX !== "" && a.oScroll.sXInner !== "") b.style.width = t(a.oScroll.sXInner); else if (a.oScroll.sX !== "") {
                        b.style.width = "";
                        if (i(b).width() < g.offsetWidth) b.style.width = t(g.offsetWidth)
                    } else if (a.oScroll.sY !== "") b.style.width = t(g.offsetWidth); else if (k) b.style.width = t(k);
                    b.style.visibility = "hidden";
                    cb(a,
                        b);
                    e = i("tbody tr:eq(0)", b).children();
                    if (e.length === 0) e = Z(a, i("thead", b)[0]);
                    if (a.oScroll.sX !== "") {
                        for (f = d = g = 0; f < a.aoColumns.length; f++) if (a.aoColumns[f].bVisible) {
                            g += a.aoColumns[f].sWidthOrig === null ? i(e[d]).outerWidth() : parseInt(a.aoColumns[f].sWidth.replace("px", ""), 10) + (i(e[d]).outerWidth() - i(e[d]).width());
                            d++
                        }
                        b.style.width = t(g);
                        a.nTable.style.width = t(g)
                    }
                    for (f = d = 0; f < a.aoColumns.length; f++) if (a.aoColumns[f].bVisible) {
                        g = i(e[d]).width();
                        if (g !== null && g > 0) a.aoColumns[f].sWidth = t(g);
                        d++
                    }
                    e = i(b).css("width");
                    a.nTable.style.width = e.indexOf("%") !== -1 ? e : t(i(b).outerWidth());
                    b.parentNode.removeChild(b)
                }
                if (k) a.nTable.style.width = t(k)
            }

            function cb(a, b) {
                if (a.oScroll.sX === "" && a.oScroll.sY !== "") {
                    i(b).width();
                    b.style.width = t(i(b).outerWidth() - a.oScroll.iBarWidth)
                } else if (a.oScroll.sX !== "") b.style.width = t(i(b).outerWidth())
            }

            function bb(a, b) {
                var c = db(a, b);
                if (c < 0) return null;
                if (a.aoData[c].nTr === null) {
                    var d = s.createElement("td");
                    d.innerHTML = F(a, c, b, "");
                    return d
                }
                return W(a, c)[b]
            }

            function db(a, b) {
                for (var c = -1, d = -1, e =
                    0; e < a.aoData.length; e++) {
                    var f = F(a, e, b, "display") + "";
                    f = f.replace(/<.*?>/g, "");
                    if (f.length > c) {
                        c = f.length;
                        d = e
                    }
                }
                return d
            }

            function t(a) {
                if (a === null) return "0px";
                if (typeof a == "number") {
                    if (a < 0) return "0px";
                    return a + "px"
                }
                var b = a.charCodeAt(a.length - 1);
                if (b < 48 || b > 57) return a;
                return a + "px"
            }

            function eb() {
                var a = s.createElement("p"), b = a.style;
                b.width = "100%";
                b.height = "200px";
                b.padding = "0px";
                var c = s.createElement("div");
                b = c.style;
                b.position = "absolute";
                b.top = "0px";
                b.left = "0px";
                b.visibility = "hidden";
                b.width = "200px";
                b.height = "150px";
                b.padding = "0px";
                b.overflow = "hidden";
                c.appendChild(a);
                s.body.appendChild(c);
                b = a.offsetWidth;
                c.style.overflow = "scroll";
                a = a.offsetWidth;
                if (b == a) a = c.clientWidth;
                s.body.removeChild(c);
                return b - a
            }

            function $(a, b) {
                var c, d, e, f, g, j, k = [], m = [], u = l.ext.oSort, x = a.aoData, y = a.aoColumns,
                    B = a.oLanguage.oAria;
                if (!a.oFeatures.bServerSide && (a.aaSorting.length !== 0 || a.aaSortingFixed !== null)) {
                    k = a.aaSortingFixed !== null ? a.aaSortingFixed.concat(a.aaSorting) : a.aaSorting.slice();
                    for (c = 0; c < k.length; c++) {
                        d = k[c][0];
                        e = w(a, d);
                        f = a.aoColumns[d].sSortDataType;
                        if (l.ext.afnSortData[f]) {
                            g = l.ext.afnSortData[f].call(a.oInstance, a, d, e);
                            if (g.length === x.length) {
                                e = 0;
                                for (f = x.length; e < f; e++) S(a, e, d, g[e])
                            } else O(a, 0, "Returned data sort array (col " + d + ") is the wrong length")
                        }
                    }
                    c = 0;
                    for (d = a.aiDisplayMaster.length; c < d; c++) m[a.aiDisplayMaster[c]] = c;
                    var T = k.length, M;
                    c = 0;
                    for (d = x.length; c < d; c++) for (e = 0; e < T; e++) {
                        M = y[k[e][0]].aDataSort;
                        g = 0;
                        for (j = M.length; g < j; g++) {
                            f = y[M[g]].sType;
                            f = u[(f ? f : "string") + "-pre"];
                            x[c]._aSortData[M[g]] = f ? f(F(a,
                                c, M[g], "sort")) : F(a, c, M[g], "sort")
                        }
                    }
                    a.aiDisplayMaster.sort(function (L, ja) {
                        var U, z, Q, aa, ka;
                        for (U = 0; U < T; U++) {
                            ka = y[k[U][0]].aDataSort;
                            z = 0;
                            for (Q = ka.length; z < Q; z++) {
                                aa = y[ka[z]].sType;
                                aa = u[(aa ? aa : "string") + "-" + k[U][1]](x[L]._aSortData[ka[z]], x[ja]._aSortData[ka[z]]);
                                if (aa !== 0) return aa
                            }
                        }
                        return u["numeric-asc"](m[L], m[ja])
                    })
                }
                if ((b === p || b) && !a.oFeatures.bDeferRender) ba(a);
                c = 0;
                for (d = a.aoColumns.length; c < d; c++) {
                    e = y[c].sTitle.replace(/<.*?>/g, "");
                    b = y[c].nTh;
                    b.removeAttribute("aria-sort");
                    b.removeAttribute("aria-label");
                    if (y[c].bSortable) if (k.length > 0 && k[0][0] == c) {
                        b.setAttribute("aria-sort", k[0][1] == "asc" ? "ascending" : "descending");
                        b.setAttribute("aria-label", e + ((y[c].asSorting[k[0][2] + 1] ? y[c].asSorting[k[0][2] + 1] : y[c].asSorting[0]) == "asc" ? B.sSortAscending : B.sSortDescending))
                    } else b.setAttribute("aria-label", e + (y[c].asSorting[0] == "asc" ? B.sSortAscending : B.sSortDescending)); else b.setAttribute("aria-label", e)
                }
                a.bSorted = true;
                i(a.oInstance).trigger("sort", a);
                if (a.oFeatures.bFilter) X(a, a.oPreviousSearch, 1); else {
                    a.aiDisplay =
                        a.aiDisplayMaster.slice();
                    a._iDisplayStart = 0;
                    I(a);
                    H(a)
                }
            }

            function ya(a, b, c, d) {
                fb(b, {}, function (e) {
                    if (a.aoColumns[c].bSortable !== false) {
                        var f = function () {
                            var g, j;
                            if (e.shiftKey) {
                                for (var k = false, m = 0; m < a.aaSorting.length; m++) if (a.aaSorting[m][0] == c) {
                                    k = true;
                                    g = a.aaSorting[m][0];
                                    j = a.aaSorting[m][2] + 1;
                                    if (a.aoColumns[g].asSorting[j]) {
                                        a.aaSorting[m][1] = a.aoColumns[g].asSorting[j];
                                        a.aaSorting[m][2] = j
                                    } else a.aaSorting.splice(m, 1);
                                    break
                                }
                                k === false && a.aaSorting.push([c, a.aoColumns[c].asSorting[0], 0])
                            } else if (a.aaSorting.length ==
                                1 && a.aaSorting[0][0] == c) {
                                g = a.aaSorting[0][0];
                                j = a.aaSorting[0][2] + 1;
                                a.aoColumns[g].asSorting[j] || (j = 0);
                                a.aaSorting[0][1] = a.aoColumns[g].asSorting[j];
                                a.aaSorting[0][2] = j
                            } else {
                                a.aaSorting.splice(0, a.aaSorting.length);
                                a.aaSorting.push([c, a.aoColumns[c].asSorting[0], 0])
                            }
                            $(a)
                        };
                        if (a.oFeatures.bProcessing) {
                            P(a, true);
                            setTimeout(function () {
                                f();
                                a.oFeatures.bServerSide || P(a, false)
                            }, 0)
                        } else f();
                        typeof d == "function" && d(a)
                    }
                })
            }

            function ba(a) {
                var b, c, d, e, f, g = a.aoColumns.length, j = a.oClasses;
                for (b = 0; b < g; b++) a.aoColumns[b].bSortable &&
                i(a.aoColumns[b].nTh).removeClass(j.sSortAsc + " " + j.sSortDesc + " " + a.aoColumns[b].sSortingClass);
                c = a.aaSortingFixed !== null ? a.aaSortingFixed.concat(a.aaSorting) : a.aaSorting.slice();
                for (b = 0; b < a.aoColumns.length; b++) if (a.aoColumns[b].bSortable) {
                    f = a.aoColumns[b].sSortingClass;
                    e = -1;
                    for (d = 0; d < c.length; d++) if (c[d][0] == b) {
                        f = c[d][1] == "asc" ? j.sSortAsc : j.sSortDesc;
                        e = d;
                        break
                    }
                    i(a.aoColumns[b].nTh).addClass(f);
                    if (a.bJUI) {
                        f = i("span." + j.sSortIcon, a.aoColumns[b].nTh);
                        f.removeClass(j.sSortJUIAsc + " " + j.sSortJUIDesc + " " +
                            j.sSortJUI + " " + j.sSortJUIAscAllowed + " " + j.sSortJUIDescAllowed);
                        f.addClass(e == -1 ? a.aoColumns[b].sSortingClassJUI : c[e][1] == "asc" ? j.sSortJUIAsc : j.sSortJUIDesc)
                    }
                } else i(a.aoColumns[b].nTh).addClass(a.aoColumns[b].sSortingClass);
                f = j.sSortColumn;
                if (a.oFeatures.bSort && a.oFeatures.bSortClasses) {
                    a = W(a);
                    e = [];
                    for (b = 0; b < g; b++) e.push("");
                    b = 0;
                    for (d = 1; b < c.length; b++) {
                        j = parseInt(c[b][0], 10);
                        e[j] = f + d;
                        d < 3 && d++
                    }
                    f = new RegExp(f + "[123]");
                    var k;
                    b = 0;
                    for (c = a.length; b < c; b++) {
                        j = b % g;
                        d = a[b].className;
                        k = e[j];
                        j = d.replace(f, k);
                        if (j != d) a[b].className = i.trim(j); else if (k.length > 0 && d.indexOf(k) == -1) a[b].className = d + " " + k
                    }
                }
            }

            function Ha(a) {
                if (!(!a.oFeatures.bStateSave || a.bDestroying)) {
                    var b, c;
                    b = a.oScroll.bInfinite;
                    var d = {
                        iCreate: (new Date).getTime(),
                        iStart: b ? 0 : a._iDisplayStart,
                        iEnd: b ? a._iDisplayLength : a._iDisplayEnd,
                        iLength: a._iDisplayLength,
                        aaSorting: i.extend(true, [], a.aaSorting),
                        oSearch: i.extend(true, {}, a.oPreviousSearch),
                        aoSearchCols: i.extend(true, [], a.aoPreSearchCols),
                        abVisCols: []
                    };
                    b = 0;
                    for (c = a.aoColumns.length; b < c; b++) d.abVisCols.push(a.aoColumns[b].bVisible);
                    K(a, "aoStateSaveParams", "stateSaveParams", [a, d]);
                    a.fnStateSave.call(a.oInstance, a, d)
                }
            }

            function gb(a, b) {
                if (a.oFeatures.bStateSave) {
                    var c = a.fnStateLoad.call(a.oInstance, a);
                    if (c) {
                        var d = K(a, "aoStateLoadParams", "stateLoadParams", [a, c]);
                        if (i.inArray(false, d) === -1) {
                            a.oLoadedState = i.extend(true, {}, c);
                            a._iDisplayStart = c.iStart;
                            a.iInitDisplayStart = c.iStart;
                            a._iDisplayEnd = c.iEnd;
                            a._iDisplayLength = c.iLength;
                            a.aaSorting = c.aaSorting.slice();
                            a.saved_aaSorting = c.aaSorting.slice();
                            i.extend(a.oPreviousSearch, c.oSearch);
                            i.extend(true, a.aoPreSearchCols, c.aoSearchCols);
                            b.saved_aoColumns = [];
                            for (d = 0; d < c.abVisCols.length; d++) {
                                b.saved_aoColumns[d] = {};
                                b.saved_aoColumns[d].bVisible = c.abVisCols[d]
                            }
                            K(a, "aoStateLoaded", "stateLoaded", [a, c])
                        }
                    }
                }
            }

            function lb(a, b, c, d, e) {
                var f = new Date;
                f.setTime(f.getTime() + c * 1E3);
                c = la.location.pathname.split("/");
                a = a + "_" + c.pop().replace(/[\/:]/g, "").toLowerCase();
                var g;
                if (e !== null) {
                    g = typeof i.parseJSON === "function" ? i.parseJSON(b) : eval("(" + b + ")");
                    b = e(a, g, f.toGMTString(), c.join("/") + "/")
                } else b = a +
                    "=" + encodeURIComponent(b) + "; expires=" + f.toGMTString() + "; path=" + c.join("/") + "/";
                a = s.cookie.split(";");
                e = b.split(";")[0].length;
                f = [];
                if (e + s.cookie.length + 10 > 4096) {
                    for (var j = 0, k = a.length; j < k; j++) if (a[j].indexOf(d) != -1) {
                        var m = a[j].split("=");
                        try {
                            (g = eval("(" + decodeURIComponent(m[1]) + ")")) && g.iCreate && f.push({
                                name: m[0],
                                time: g.iCreate
                            })
                        } catch (u) {
                        }
                    }
                    for (f.sort(function (x, y) {
                        return y.time - x.time
                    }); e + s.cookie.length + 10 > 4096;) {
                        if (f.length === 0) return;
                        d = f.pop();
                        s.cookie = d.name + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=" +
                            c.join("/") + "/"
                    }
                }
                s.cookie = b
            }

            function mb(a) {
                var b = la.location.pathname.split("/");
                a = a + "_" + b[b.length - 1].replace(/[\/:]/g, "").toLowerCase() + "=";
                b = s.cookie.split(";");
                for (var c = 0; c < b.length; c++) {
                    for (var d = b[c]; d.charAt(0) == " ";) d = d.substring(1, d.length);
                    if (d.indexOf(a) === 0) return decodeURIComponent(d.substring(a.length, d.length))
                }
                return null
            }

            function C(a) {
                for (var b = 0; b < l.settings.length; b++) if (l.settings[b].nTable === a) return l.settings[b];
                return null
            }

            function fa(a) {
                var b = [];
                a = a.aoData;
                for (var c = 0, d =
                    a.length; c < d; c++) a[c].nTr !== null && b.push(a[c].nTr);
                return b
            }

            function W(a, b) {
                var c = [], d, e, f, g, j;
                e = 0;
                var k = a.aoData.length;
                if (b !== p) {
                    e = b;
                    k = b + 1
                }
                for (e = e; e < k; e++) {
                    j = a.aoData[e];
                    if (j.nTr !== null) {
                        b = [];
                        for (d = j.nTr.firstChild; d;) {
                            f = d.nodeName.toLowerCase();
                            if (f == "td" || f == "th") b.push(d);
                            d = d.nextSibling
                        }
                        f = d = 0;
                        for (g = a.aoColumns.length; f < g; f++) if (a.aoColumns[f].bVisible) c.push(b[f - d]); else {
                            c.push(j._anHidden[f]);
                            d++
                        }
                    }
                }
                return c
            }

            function O(a, b, c) {
                a = a === null ? "DataTables warning: " + c : "DataTables warning (table id = '" +
                    a.sTableId + "'): " + c;
                if (b === 0) if (l.ext.sErrMode == "alert") alert(a); else throw new Error(a); else la.console && console.log && console.log(a)
            }

            function r(a, b, c, d) {
                if (d === p) d = c;
                if (b[c] !== p) a[d] = b[c]
            }

            function hb(a, b) {
                var c;
                for (var d in b) if (b.hasOwnProperty(d)) {
                    c = b[d];
                    if (typeof h[d] === "object" && c !== null && i.isArray(c) === false) i.extend(true, a[d], c); else a[d] = c
                }
                return a
            }

            function fb(a, b, c) {
                i(a).bind("click.DT", b, function (d) {
                    a.blur();
                    c(d)
                }).bind("keypress.DT", b, function (d) {
                    d.which === 13 && c(d)
                }).bind("selectstart.DT",
                    function () {
                        return false
                    })
            }

            function J(a, b, c, d) {
                c && a[b].push({fn: c, sName: d})
            }

            function K(a, b, c, d) {
                b = a[b];
                for (var e = [], f = b.length - 1; f >= 0; f--) e.push(b[f].fn.apply(a.oInstance, d));
                c !== null && i(a.oInstance).trigger(c, d);
                return e
            }

            function ib(a) {
                var b = i('<div style="position:absolute; top:0; left:0; height:1px; width:1px; overflow:hidden"><div style="position:absolute; top:1px; left:1px; width:100px; overflow:scroll;"><div id="DT_BrowserTest" style="width:100%; height:10px;"></div></div></div>')[0];
                s.body.appendChild(b);
                a.oBrowser.bScrollOversize = i("#DT_BrowserTest", b)[0].offsetWidth === 100 ? true : false;
                s.body.removeChild(b)
            }

            function jb(a) {
                return function () {
                    var b = [C(this[l.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));
                    return l.ext.oApi[a].apply(this, b)
                }
            }

            var ga = /\[.*?\]$/, kb = la.JSON ? JSON.stringify : function (a) {
                var b = typeof a;
                if (b !== "object" || a === null) {
                    if (b === "string") a = '"' + a + '"';
                    return a + ""
                }
                var c, d, e = [], f = i.isArray(a);
                for (c in a) {
                    d = a[c];
                    b = typeof d;
                    if (b === "string") d = '"' + d + '"'; else if (b === "object" && d !==
                        null) d = kb(d);
                    e.push((f ? "" : '"' + c + '":') + d)
                }
                return (f ? "[" : "{") + e + (f ? "]" : "}")
            };
            this.$ = function (a, b) {
                var c, d = [], e;
                c = C(this[l.ext.iApiIndex]);
                var f = c.aoData, g = c.aiDisplay, j = c.aiDisplayMaster;
                b || (b = {});
                b = i.extend({}, {filter: "none", order: "current", page: "all"}, b);
                if (b.page == "current") {
                    b = c._iDisplayStart;
                    for (c = c.fnDisplayEnd(); b < c; b++) (e = f[g[b]].nTr) && d.push(e)
                } else if (b.order == "current" && b.filter == "none") {
                    b = 0;
                    for (c = j.length; b < c; b++) (e = f[j[b]].nTr) && d.push(e)
                } else if (b.order == "current" && b.filter == "applied") {
                    b =
                        0;
                    for (c = g.length; b < c; b++) (e = f[g[b]].nTr) && d.push(e)
                } else if (b.order == "original" && b.filter == "none") {
                    b = 0;
                    for (c = f.length; b < c; b++) (e = f[b].nTr) && d.push(e)
                } else if (b.order == "original" && b.filter == "applied") {
                    b = 0;
                    for (c = f.length; b < c; b++) {
                        e = f[b].nTr;
                        i.inArray(b, g) !== -1 && e && d.push(e)
                    }
                } else O(c, 1, "Unknown selection options");
                f = i(d);
                d = f.filter(a);
                a = f.find(a);
                return i([].concat(i.makeArray(d), i.makeArray(a)))
            };
            this._ = function (a, b) {
                var c = [], d = this.$(a, b);
                a = 0;
                for (b = d.length; a < b; a++) c.push(this.fnGetData(d[a]));
                return c
            };
            this.fnAddData = function (a, b) {
                if (a.length === 0) return [];
                var c = [], d, e = C(this[l.ext.iApiIndex]);
                if (typeof a[0] === "object" && a[0] !== null) for (var f = 0; f < a.length; f++) {
                    d = R(e, a[f]);
                    if (d == -1) return c;
                    c.push(d)
                } else {
                    d = R(e, a);
                    if (d == -1) return c;
                    c.push(d)
                }
                e.aiDisplay = e.aiDisplayMaster.slice();
                if (b === p || b) qa(e);
                return c
            };
            this.fnAdjustColumnSizing = function (a) {
                var b = C(this[l.ext.iApiIndex]);
                o(b);
                if (a === p || a) this.fnDraw(false); else if (b.oScroll.sX !== "" || b.oScroll.sY !== "") this.oApi._fnScrollDraw(b)
            };
            this.fnClearTable =
                function (a) {
                    var b = C(this[l.ext.iApiIndex]);
                    wa(b);
                    if (a === p || a) H(b)
                };
            this.fnClose = function (a) {
                for (var b = C(this[l.ext.iApiIndex]), c = 0; c < b.aoOpenRows.length; c++) if (b.aoOpenRows[c].nParent == a) {
                    (a = b.aoOpenRows[c].nTr.parentNode) && a.removeChild(b.aoOpenRows[c].nTr);
                    b.aoOpenRows.splice(c, 1);
                    return 0
                }
                return 1
            };
            this.fnDeleteRow = function (a, b, c) {
                var d = C(this[l.ext.iApiIndex]), e, f;
                a = typeof a === "object" ? V(d, a) : a;
                var g = d.aoData.splice(a, 1);
                e = 0;
                for (f = d.aoData.length; e < f; e++) if (d.aoData[e].nTr !== null) d.aoData[e].nTr._DT_RowIndex =
                    e;
                e = i.inArray(a, d.aiDisplay);
                d.asDataSearch.splice(e, 1);
                xa(d.aiDisplayMaster, a);
                xa(d.aiDisplay, a);
                typeof b === "function" && b.call(this, d, g);
                if (d._iDisplayStart >= d.fnRecordsDisplay()) {
                    d._iDisplayStart -= d._iDisplayLength;
                    if (d._iDisplayStart < 0) d._iDisplayStart = 0
                }
                if (c === p || c) {
                    I(d);
                    H(d)
                }
                return g
            };
            this.fnDestroy = function (a) {
                var b = C(this[l.ext.iApiIndex]), c = b.nTableWrapper.parentNode, d = b.nTBody, e, f;
                a = a === p ? false : a;
                b.bDestroying = true;
                K(b, "aoDestroyCallback", "destroy", [b]);
                if (!a) {
                    e = 0;
                    for (f = b.aoColumns.length; e <
                    f; e++) b.aoColumns[e].bVisible === false && this.fnSetColumnVis(e, true)
                }
                i(b.nTableWrapper).find("*").andSelf().unbind(".DT");
                i("tbody>tr>td." + b.oClasses.sRowEmpty, b.nTable).parent().remove();
                if (b.nTable != b.nTHead.parentNode) {
                    i(b.nTable).children("thead").remove();
                    b.nTable.appendChild(b.nTHead)
                }
                if (b.nTFoot && b.nTable != b.nTFoot.parentNode) {
                    i(b.nTable).children("tfoot").remove();
                    b.nTable.appendChild(b.nTFoot)
                }
                b.nTable.parentNode.removeChild(b.nTable);
                i(b.nTableWrapper).remove();
                b.aaSorting = [];
                b.aaSortingFixed =
                    [];
                ba(b);
                i(fa(b)).removeClass(b.asStripeClasses.join(" "));
                i("th, td", b.nTHead).removeClass([b.oClasses.sSortable, b.oClasses.sSortableAsc, b.oClasses.sSortableDesc, b.oClasses.sSortableNone].join(" "));
                if (b.bJUI) {
                    i("th span." + b.oClasses.sSortIcon + ", td span." + b.oClasses.sSortIcon, b.nTHead).remove();
                    i("th, td", b.nTHead).each(function () {
                        var g = i("div." + b.oClasses.sSortJUIWrapper, this), j = g.contents();
                        i(this).append(j);
                        g.remove()
                    })
                }
                if (!a && b.nTableReinsertBefore) c.insertBefore(b.nTable, b.nTableReinsertBefore);
                else a || c.appendChild(b.nTable);
                e = 0;
                for (f = b.aoData.length; e < f; e++) b.aoData[e].nTr !== null && d.appendChild(b.aoData[e].nTr);
                if (b.oFeatures.bAutoWidth === true) b.nTable.style.width = t(b.sDestroyWidth);
                if (f = b.asDestroyStripes.length) {
                    a = i(d).children("tr");
                    for (e = 0; e < f; e++) a.filter(":nth-child(" + f + "n + " + e + ")").addClass(b.asDestroyStripes[e])
                }
                e = 0;
                for (f = l.settings.length; e < f; e++) l.settings[e] == b && l.settings.splice(e, 1);
                h = b = null
            };
            this.fnDraw = function (a) {
                var b = C(this[l.ext.iApiIndex]);
                if (a === false) {
                    I(b);
                    H(b)
                } else qa(b)
            };
            this.fnFilter = function (a, b, c, d, e, f) {
                var g = C(this[l.ext.iApiIndex]);
                if (g.oFeatures.bFilter) {
                    if (c === p || c === null) c = false;
                    if (d === p || d === null) d = true;
                    if (e === p || e === null) e = true;
                    if (f === p || f === null) f = true;
                    if (b === p || b === null) {
                        X(g, {sSearch: a + "", bRegex: c, bSmart: d, bCaseInsensitive: f}, 1);
                        if (e && g.aanFeatures.f) {
                            b = g.aanFeatures.f;
                            c = 0;
                            for (d = b.length; c < d; c++) try {
                                b[c]._DT_Input != s.activeElement && i(b[c]._DT_Input).val(a)
                            } catch (j) {
                                i(b[c]._DT_Input).val(a)
                            }
                        }
                    } else {
                        i.extend(g.aoPreSearchCols[b], {
                            sSearch: a + "", bRegex: c, bSmart: d,
                            bCaseInsensitive: f
                        });
                        X(g, g.oPreviousSearch, 1)
                    }
                }
            };
            this.fnGetData = function (a, b) {
                var c = C(this[l.ext.iApiIndex]);
                if (a !== p) {
                    var d = a;
                    if (typeof a === "object") {
                        var e = a.nodeName.toLowerCase();
                        if (e === "tr") d = V(c, a); else if (e === "td") {
                            d = V(c, a.parentNode);
                            b = va(c, d, a)
                        }
                    }
                    if (b !== p) return F(c, d, b, "");
                    return c.aoData[d] !== p ? c.aoData[d]._aData : null
                }
                return oa(c)
            };
            this.fnGetNodes = function (a) {
                var b = C(this[l.ext.iApiIndex]);
                if (a !== p) return b.aoData[a] !== p ? b.aoData[a].nTr : null;
                return fa(b)
            };
            this.fnGetPosition = function (a) {
                var b =
                    C(this[l.ext.iApiIndex]), c = a.nodeName.toUpperCase();
                if (c == "TR") return V(b, a); else if (c == "TD" || c == "TH") {
                    c = V(b, a.parentNode);
                    a = va(b, c, a);
                    return [c, w(b, a), a]
                }
                return null
            };
            this.fnIsOpen = function (a) {
                for (var b = C(this[l.ext.iApiIndex]), c = 0; c < b.aoOpenRows.length; c++) if (b.aoOpenRows[c].nParent == a) return true;
                return false
            };
            this.fnOpen = function (a, b, c) {
                var d = C(this[l.ext.iApiIndex]), e = fa(d);
                if (i.inArray(a, e) !== -1) {
                    this.fnClose(a);
                    e = s.createElement("tr");
                    var f = s.createElement("td");
                    e.appendChild(f);
                    f.className =
                        c;
                    f.colSpan = D(d);
                    if (typeof b === "string") f.innerHTML = b; else i(f).html(b);
                    b = i("tr", d.nTBody);
                    i.inArray(a, b) != -1 && i(e).insertAfter(a);
                    d.aoOpenRows.push({nTr: e, nParent: a});
                    return e
                }
            };
            this.fnPageChange = function (a, b) {
                var c = C(this[l.ext.iApiIndex]);
                Ga(c, a);
                I(c);
                if (b === p || b) H(c)
            };
            this.fnSetColumnVis = function (a, b, c) {
                var d = C(this[l.ext.iApiIndex]), e, f, g = d.aoColumns, j = d.aoData, k, m;
                if (g[a].bVisible != b) {
                    if (b) {
                        for (e = f = 0; e < a; e++) g[e].bVisible && f++;
                        m = f >= D(d);
                        if (!m) for (e = a; e < g.length; e++) if (g[e].bVisible) {
                            k = e;
                            break
                        }
                        e =
                            0;
                        for (f = j.length; e < f; e++) if (j[e].nTr !== null) m ? j[e].nTr.appendChild(j[e]._anHidden[a]) : j[e].nTr.insertBefore(j[e]._anHidden[a], W(d, e)[k])
                    } else {
                        e = 0;
                        for (f = j.length; e < f; e++) if (j[e].nTr !== null) {
                            k = W(d, e)[a];
                            j[e]._anHidden[a] = k;
                            k.parentNode.removeChild(k)
                        }
                    }
                    g[a].bVisible = b;
                    ia(d, d.aoHeader);
                    d.nTFoot && ia(d, d.aoFooter);
                    e = 0;
                    for (f = d.aoOpenRows.length; e < f; e++) d.aoOpenRows[e].nTr.colSpan = D(d);
                    if (c === p || c) {
                        o(d);
                        H(d)
                    }
                    Ha(d)
                }
            };
            this.fnSettings = function () {
                return C(this[l.ext.iApiIndex])
            };
            this.fnSort = function (a) {
                var b =
                    C(this[l.ext.iApiIndex]);
                b.aaSorting = a;
                $(b)
            };
            this.fnSortListener = function (a, b, c) {
                ya(C(this[l.ext.iApiIndex]), a, b, c)
            };
            this.fnUpdate = function (a, b, c, d, e) {
                var f = C(this[l.ext.iApiIndex]);
                b = typeof b === "object" ? V(f, b) : b;
                if (i.isArray(a) && c === p) {
                    f.aoData[b]._aData = a.slice();
                    for (c = 0; c < f.aoColumns.length; c++) this.fnUpdate(F(f, b, c), b, c, false, false)
                } else if (i.isPlainObject(a) && c === p) {
                    f.aoData[b]._aData = i.extend(true, {}, a);
                    for (c = 0; c < f.aoColumns.length; c++) this.fnUpdate(F(f, b, c), b, c, false, false)
                } else {
                    S(f, b, c, a);
                    a = F(f, b, c, "display");
                    var g = f.aoColumns[c];
                    if (g.fnRender !== null) {
                        a = da(f, b, c);
                        g.bUseRendered && S(f, b, c, a)
                    }
                    if (f.aoData[b].nTr !== null) W(f, b)[c].innerHTML = a
                }
                c = i.inArray(b, f.aiDisplay);
                f.asDataSearch[c] = Da(f, na(f, b, "filter", A(f, "bSearchable")));
                if (e === p || e) o(f);
                if (d === p || d) qa(f);
                return 0
            };
            this.fnVersionCheck = l.ext.fnVersionCheck;
            this.oApi = {
                _fnExternApiFunc: jb,
                _fnInitialise: ra,
                _fnInitComplete: pa,
                _fnLanguageCompat: Fa,
                _fnAddColumn: n,
                _fnColumnOptions: q,
                _fnAddData: R,
                _fnCreateTr: ua,
                _fnGatherData: ea,
                _fnBuildHead: Ka,
                _fnDrawHead: ia,
                _fnDraw: H,
                _fnReDraw: qa,
                _fnAjaxUpdate: La,
                _fnAjaxParameters: Ta,
                _fnAjaxUpdateDraw: Ua,
                _fnServerParams: Aa,
                _fnAddOptionsHtml: Ma,
                _fnFeatureHtmlTable: Qa,
                _fnScrollDraw: $a,
                _fnAdjustColumnSizing: o,
                _fnFeatureHtmlFilter: Oa,
                _fnFilterComplete: X,
                _fnFilterCustom: Xa,
                _fnFilterColumn: Wa,
                _fnFilter: Va,
                _fnBuildSearchArray: Ba,
                _fnBuildSearchRow: Da,
                _fnFilterCreateSearch: Ca,
                _fnDataToSearch: Ya,
                _fnSort: $,
                _fnSortAttachListener: ya,
                _fnSortingClasses: ba,
                _fnFeatureHtmlPaginate: Sa,
                _fnPageChange: Ga,
                _fnFeatureHtmlInfo: Ra,
                _fnUpdateInfo: Za,
                _fnFeatureHtmlLength: Na,
                _fnFeatureHtmlProcessing: Pa,
                _fnProcessingDisplay: P,
                _fnVisibleToColumnIndex: v,
                _fnColumnIndexToVisible: w,
                _fnNodeToDataIndex: V,
                _fnVisbleColumns: D,
                _fnCalculateEnd: I,
                _fnConvertToWidth: ab,
                _fnCalculateColumnWidths: ta,
                _fnScrollingWidthAdjust: cb,
                _fnGetWidestNode: bb,
                _fnGetMaxLenString: db,
                _fnStringToCss: t,
                _fnDetectType: G,
                _fnSettingsFromNode: C,
                _fnGetDataMaster: oa,
                _fnGetTrNodes: fa,
                _fnGetTdNodes: W,
                _fnEscapeRegex: Ea,
                _fnDeleteIndex: xa,
                _fnReOrderIndex: E,
                _fnColumnOrdering: Y,
                _fnLog: O,
                _fnClearTable: wa,
                _fnSaveState: Ha,
                _fnLoadState: gb,
                _fnCreateCookie: lb,
                _fnReadCookie: mb,
                _fnDetectHeader: ha,
                _fnGetUniqueThs: Z,
                _fnScrollBarWidth: eb,
                _fnApplyToChildren: N,
                _fnMap: r,
                _fnGetRowData: na,
                _fnGetCellData: F,
                _fnSetCellData: S,
                _fnGetObjectDataFn: ca,
                _fnSetObjectDataFn: Ja,
                _fnApplyColumnDefs: ma,
                _fnBindAction: fb,
                _fnExtend: hb,
                _fnCallbackReg: J,
                _fnCallbackFire: K,
                _fnJsonString: kb,
                _fnRender: da,
                _fnNodeToColumnIndex: va,
                _fnInfoMacros: za,
                _fnBrowserDetect: ib,
                _fnGetColumns: A
            };
            i.extend(l.ext.oApi, this.oApi);
            for (var Ia in l.ext.oApi) if (Ia) this[Ia] = jb(Ia);
            var sa = this;
            this.each(function () {
                var a = 0, b, c, d;
                c = this.getAttribute("id");
                var e = false, f = false;
                if (this.nodeName.toLowerCase() != "table") O(null, 0, "Attempted to initialise DataTables on a node which is not a table: " + this.nodeName); else {
                    a = 0;
                    for (b = l.settings.length; a < b; a++) {
                        if (l.settings[a].nTable == this) if (h === p || h.bRetrieve) return l.settings[a].oInstance; else if (h.bDestroy) {
                            l.settings[a].oInstance.fnDestroy();
                            break
                        } else {
                            O(l.settings[a], 0, "Cannot reinitialise DataTable.\n\nTo retrieve the DataTables object for this table, pass no arguments or see the docs for bRetrieve and bDestroy");
                            return
                        }
                        if (l.settings[a].sTableId == this.id) {
                            l.settings.splice(a, 1);
                            break
                        }
                    }
                    if (c === null || c === "") this.id = c = "DataTables_Table_" + l.ext._oExternConfig.iNextUnique++;
                    var g = i.extend(true, {}, l.models.oSettings, {
                        nTable: this,
                        oApi: sa.oApi,
                        oInit: h,
                        sDestroyWidth: i(this).width(),
                        sInstance: c,
                        sTableId: c
                    });
                    l.settings.push(g);
                    g.oInstance = sa.length === 1 ? sa : i(this).dataTable();
                    h || (h = {});
                    h.oLanguage && Fa(h.oLanguage);
                    h = hb(i.extend(true, {}, l.defaults), h);
                    r(g.oFeatures, h, "bPaginate");
                    r(g.oFeatures, h, "bLengthChange");
                    r(g.oFeatures,
                        h, "bFilter");
                    r(g.oFeatures, h, "bSort");
                    r(g.oFeatures, h, "bInfo");
                    r(g.oFeatures, h, "bProcessing");
                    r(g.oFeatures, h, "bAutoWidth");
                    r(g.oFeatures, h, "bSortClasses");
                    r(g.oFeatures, h, "bServerSide");
                    r(g.oFeatures, h, "bDeferRender");
                    r(g.oScroll, h, "sScrollX", "sX");
                    r(g.oScroll, h, "sScrollXInner", "sXInner");
                    r(g.oScroll, h, "sScrollY", "sY");
                    r(g.oScroll, h, "bScrollCollapse", "bCollapse");
                    r(g.oScroll, h, "bScrollInfinite", "bInfinite");
                    r(g.oScroll, h, "iScrollLoadGap", "iLoadGap");
                    r(g.oScroll, h, "bScrollAutoCss", "bAutoCss");
                    r(g,
                        h, "asStripeClasses");
                    r(g, h, "asStripClasses", "asStripeClasses");
                    r(g, h, "fnServerData");
                    r(g, h, "fnFormatNumber");
                    r(g, h, "sServerMethod");
                    r(g, h, "aaSorting");
                    r(g, h, "aaSortingFixed");
                    r(g, h, "aLengthMenu");
                    r(g, h, "sPaginationType");
                    r(g, h, "sAjaxSource");
                    r(g, h, "sAjaxDataProp");
                    r(g, h, "iCookieDuration");
                    r(g, h, "sCookiePrefix");
                    r(g, h, "sDom");
                    r(g, h, "bSortCellsTop");
                    r(g, h, "iTabIndex");
                    r(g, h, "oSearch", "oPreviousSearch");
                    r(g, h, "aoSearchCols", "aoPreSearchCols");
                    r(g, h, "iDisplayLength", "_iDisplayLength");
                    r(g, h, "bJQueryUI",
                        "bJUI");
                    r(g, h, "fnCookieCallback");
                    r(g, h, "fnStateLoad");
                    r(g, h, "fnStateSave");
                    r(g.oLanguage, h, "fnInfoCallback");
                    J(g, "aoDrawCallback", h.fnDrawCallback, "user");
                    J(g, "aoServerParams", h.fnServerParams, "user");
                    J(g, "aoStateSaveParams", h.fnStateSaveParams, "user");
                    J(g, "aoStateLoadParams", h.fnStateLoadParams, "user");
                    J(g, "aoStateLoaded", h.fnStateLoaded, "user");
                    J(g, "aoRowCallback", h.fnRowCallback, "user");
                    J(g, "aoRowCreatedCallback", h.fnCreatedRow, "user");
                    J(g, "aoHeaderCallback", h.fnHeaderCallback, "user");
                    J(g, "aoFooterCallback",
                        h.fnFooterCallback, "user");
                    J(g, "aoInitComplete", h.fnInitComplete, "user");
                    J(g, "aoPreDrawCallback", h.fnPreDrawCallback, "user");
                    if (g.oFeatures.bServerSide && g.oFeatures.bSort && g.oFeatures.bSortClasses) J(g, "aoDrawCallback", ba, "server_side_sort_classes"); else g.oFeatures.bDeferRender && J(g, "aoDrawCallback", ba, "defer_sort_classes");
                    if (h.bJQueryUI) {
                        i.extend(g.oClasses, l.ext.oJUIClasses);
                        if (h.sDom === l.defaults.sDom && l.defaults.sDom === "lfrtip") g.sDom = '<"H"lfr>t<"F"ip>'
                    } else i.extend(g.oClasses, l.ext.oStdClasses);
                    i(this).addClass(g.oClasses.sTable);
                    if (g.oScroll.sX !== "" || g.oScroll.sY !== "") g.oScroll.iBarWidth = eb();
                    if (g.iInitDisplayStart === p) {
                        g.iInitDisplayStart = h.iDisplayStart;
                        g._iDisplayStart = h.iDisplayStart
                    }
                    if (h.bStateSave) {
                        g.oFeatures.bStateSave = true;
                        gb(g, h);
                        J(g, "aoDrawCallback", Ha, "state_save")
                    }
                    if (h.iDeferLoading !== null) {
                        g.bDeferLoading = true;
                        a = i.isArray(h.iDeferLoading);
                        g._iRecordsDisplay = a ? h.iDeferLoading[0] : h.iDeferLoading;
                        g._iRecordsTotal = a ? h.iDeferLoading[1] : h.iDeferLoading
                    }
                    if (h.aaData !== null) f = true;
                    if (h.oLanguage.sUrl !== "") {
                        g.oLanguage.sUrl = h.oLanguage.sUrl;
                        i.getJSON(g.oLanguage.sUrl, null, function (k) {
                            Fa(k);
                            i.extend(true, g.oLanguage, h.oLanguage, k);
                            ra(g)
                        });
                        e = true
                    } else i.extend(true, g.oLanguage, h.oLanguage);
                    if (h.asStripeClasses === null) g.asStripeClasses = [g.oClasses.sStripeOdd, g.oClasses.sStripeEven];
                    b = g.asStripeClasses.length;
                    g.asDestroyStripes = [];
                    if (b) {
                        c = false;
                        d = i(this).children("tbody").children("tr:lt(" + b + ")");
                        for (a = 0; a < b; a++) if (d.hasClass(g.asStripeClasses[a])) {
                            c = true;
                            g.asDestroyStripes.push(g.asStripeClasses[a])
                        }
                        c &&
                        d.removeClass(g.asStripeClasses.join(" "))
                    }
                    c = [];
                    a = this.getElementsByTagName("thead");
                    if (a.length !== 0) {
                        ha(g.aoHeader, a[0]);
                        c = Z(g)
                    }
                    if (h.aoColumns === null) {
                        d = [];
                        a = 0;
                        for (b = c.length; a < b; a++) d.push(null)
                    } else d = h.aoColumns;
                    a = 0;
                    for (b = d.length; a < b; a++) {
                        if (h.saved_aoColumns !== p && h.saved_aoColumns.length == b) {
                            if (d[a] === null) d[a] = {};
                            d[a].bVisible = h.saved_aoColumns[a].bVisible
                        }
                        n(g, c ? c[a] : null)
                    }
                    ma(g, h.aoColumnDefs, d, function (k, m) {
                        q(g, k, m)
                    });
                    a = 0;
                    for (b = g.aaSorting.length; a < b; a++) {
                        if (g.aaSorting[a][0] >= g.aoColumns.length) g.aaSorting[a][0] =
                            0;
                        var j = g.aoColumns[g.aaSorting[a][0]];
                        if (g.aaSorting[a][2] === p) g.aaSorting[a][2] = 0;
                        if (h.aaSorting === p && g.saved_aaSorting === p) g.aaSorting[a][1] = j.asSorting[0];
                        c = 0;
                        for (d = j.asSorting.length; c < d; c++) if (g.aaSorting[a][1] == j.asSorting[c]) {
                            g.aaSorting[a][2] = c;
                            break
                        }
                    }
                    ba(g);
                    ib(g);
                    a = i(this).children("caption").each(function () {
                        this._captionSide = i(this).css("caption-side")
                    });
                    b = i(this).children("thead");
                    if (b.length === 0) {
                        b = [s.createElement("thead")];
                        this.appendChild(b[0])
                    }
                    g.nTHead = b[0];
                    b = i(this).children("tbody");
                    if (b.length === 0) {
                        b = [s.createElement("tbody")];
                        this.appendChild(b[0])
                    }
                    g.nTBody = b[0];
                    g.nTBody.setAttribute("role", "alert");
                    g.nTBody.setAttribute("aria-live", "polite");
                    g.nTBody.setAttribute("aria-relevant", "all");
                    b = i(this).children("tfoot");
                    if (b.length === 0 && a.length > 0 && (g.oScroll.sX !== "" || g.oScroll.sY !== "")) {
                        b = [s.createElement("tfoot")];
                        this.appendChild(b[0])
                    }
                    if (b.length > 0) {
                        g.nTFoot = b[0];
                        ha(g.aoFooter, g.nTFoot)
                    }
                    if (f) for (a = 0; a < h.aaData.length; a++) R(g, h.aaData[a]); else ea(g);
                    g.aiDisplay = g.aiDisplayMaster.slice();
                    g.bInitialised = true;
                    e === false && ra(g)
                }
            });
            sa = null;
            return this
        };
        l.fnVersionCheck = function (h) {
            var n = function (A, G) {
                for (; A.length < G;) A += "0";
                return A
            }, q = l.ext.sVersion.split(".");
            h = h.split(".");
            for (var o = "", v = "", w = 0, D = h.length; w < D; w++) {
                o += n(q[w], 3);
                v += n(h[w], 3)
            }
            return parseInt(o, 10) >= parseInt(v, 10)
        };
        l.fnIsDataTable = function (h) {
            for (var n = l.settings, q = 0; q < n.length; q++) if (n[q].nTable === h || n[q].nScrollHead === h || n[q].nScrollFoot === h) return true;
            return false
        };
        l.fnTables = function (h) {
            var n = [];
            jQuery.each(l.settings,
                function (q, o) {
                    if (!h || h === true && i(o.nTable).is(":visible")) n.push(o.nTable)
                });
            return n
        };
        l.version = "1.9.4";
        l.settings = [];
        l.models = {};
        l.models.ext = {
            afnFiltering: [],
            afnSortData: [],
            aoFeatures: [],
            aTypes: [],
            fnVersionCheck: l.fnVersionCheck,
            iApiIndex: 0,
            ofnSearch: {},
            oApi: {},
            oStdClasses: {},
            oJUIClasses: {},
            oPagination: {},
            oSort: {},
            sVersion: l.version,
            sErrMode: "alert",
            _oExternConfig: {iNextUnique: 0}
        };
        l.models.oSearch = {bCaseInsensitive: true, sSearch: "", bRegex: false, bSmart: true};
        l.models.oRow = {
            nTr: null, _aData: [], _aSortData: [],
            _anHidden: [], _sRowStripe: ""
        };
        l.models.oColumn = {
            aDataSort: null,
            asSorting: null,
            bSearchable: null,
            bSortable: null,
            bUseRendered: null,
            bVisible: null,
            _bAutoType: true,
            fnCreatedCell: null,
            fnGetData: null,
            fnRender: null,
            fnSetData: null,
            mData: null,
            mRender: null,
            nTh: null,
            nTf: null,
            sClass: null,
            sContentPadding: null,
            sDefaultContent: null,
            sName: null,
            sSortDataType: "std",
            sSortingClass: null,
            sSortingClassJUI: null,
            sTitle: null,
            sType: null,
            sWidth: null,
            sWidthOrig: null
        };
        l.defaults = {
            aaData: null,
            aaSorting: [[0, "asc"]],
            aaSortingFixed: null,
            aLengthMenu: [10, 25, 50, 100],
            aoColumns: null,
            aoColumnDefs: null,
            aoSearchCols: [],
            asStripeClasses: null,
            bAutoWidth: true,
            bDeferRender: false,
            bDestroy: false,
            bFilter: true,
            bInfo: true,
            bJQueryUI: false,
            bLengthChange: true,
            bPaginate: true,
            bProcessing: false,
            bRetrieve: false,
            bScrollAutoCss: true,
            bScrollCollapse: false,
            bScrollInfinite: false,
            bServerSide: false,
            bSort: true,
            bSortCellsTop: false,
            bSortClasses: true,
            bStateSave: false,
            fnCookieCallback: null,
            fnCreatedRow: null,
            fnDrawCallback: null,
            fnFooterCallback: null,
            fnFormatNumber: function (h) {
                if (h <
                    1E3) return h;
                var n = h + "";
                h = n.split("");
                var q = "";
                n = n.length;
                for (var o = 0; o < n; o++) {
                    if (o % 3 === 0 && o !== 0) q = this.oLanguage.sInfoThousands + q;
                    q = h[n - o - 1] + q
                }
                return q
            },
            fnHeaderCallback: null,
            fnInfoCallback: null,
            fnInitComplete: null,
            fnPreDrawCallback: null,
            fnRowCallback: null,
            fnServerData: function (h, n, q, o) {
                o.jqXHR = i.ajax({
                    url: h, data: n, success: function (v) {
                        v.sError && o.oApi._fnLog(o, 0, v.sError);
                        i(o.oInstance).trigger("xhr", [o, v]);
                        q(v)
                    }, dataType: "json", cache: false, type: o.sServerMethod, error: function (v, w) {
                        w == "parsererror" &&
                        o.oApi._fnLog(o, 0, "DataTables warning: JSON data from server could not be parsed. This is caused by a JSON formatting error.")
                    }
                })
            },
            fnServerParams: null,
            fnStateLoad: function (h) {
                h = this.oApi._fnReadCookie(h.sCookiePrefix + h.sInstance);
                var n;
                try {
                    n = typeof i.parseJSON === "function" ? i.parseJSON(h) : eval("(" + h + ")")
                } catch (q) {
                    n = null
                }
                return n
            },
            fnStateLoadParams: null,
            fnStateLoaded: null,
            fnStateSave: function (h, n) {
                this.oApi._fnCreateCookie(h.sCookiePrefix + h.sInstance, this.oApi._fnJsonString(n), h.iCookieDuration, h.sCookiePrefix,
                    h.fnCookieCallback)
            },
            fnStateSaveParams: null,
            iCookieDuration: 7200,
            iDeferLoading: null,
            iDisplayLength: 10,
            iDisplayStart: 0,
            iScrollLoadGap: 100,
            iTabIndex: 0,
            oLanguage: {
                oAria: {
                    sSortAscending: ": activate to sort column ascending",
                    sSortDescending: ": activate to sort column descending"
                },
                oPaginate: {sFirst: "First", sLast: "Last", sNext: "Next", sPrevious: "Previous"},
                sEmptyTable: "No data available in table",
                sInfo: "Showing _START_ to _END_ of _TOTAL_ entries",
                sInfoEmpty: "Showing 0 to 0 of 0 entries",
                sInfoFiltered: "(filtered from _MAX_ total entries)",
                sInfoPostFix: "",
                sInfoThousands: ",",
                sLengthMenu: "Show _MENU_ entries",
                sLoadingRecords: "Loading...",
                sProcessing: "Processing...",
                sSearch: "Search:",
                sUrl: "",
                sZeroRecords: "No matching records found"
            },
            oSearch: i.extend({}, l.models.oSearch),
            sAjaxDataProp: "aaData",
            sAjaxSource: null,
            sCookiePrefix: "SpryMedia_DataTables_",
            sDom: "lfrtip",
            sPaginationType: "two_button",
            sScrollX: "",
            sScrollXInner: "",
            sScrollY: "",
            sServerMethod: "GET"
        };
        l.defaults.columns = {
            aDataSort: null,
            asSorting: ["asc", "desc"],
            bSearchable: true,
            bSortable: true,
            bUseRendered: true,
            bVisible: true,
            fnCreatedCell: null,
            fnRender: null,
            iDataSort: -1,
            mData: null,
            mRender: null,
            sCellType: "td",
            sClass: "",
            sContentPadding: "",
            sDefaultContent: null,
            sName: "",
            sSortDataType: "std",
            sTitle: null,
            sType: null,
            sWidth: null
        };
        l.models.oSettings = {
            oFeatures: {
                bAutoWidth: null,
                bDeferRender: null,
                bFilter: null,
                bInfo: null,
                bLengthChange: null,
                bPaginate: null,
                bProcessing: null,
                bServerSide: null,
                bSort: null,
                bSortClasses: null,
                bStateSave: null
            },
            oScroll: {
                bAutoCss: null, bCollapse: null, bInfinite: null, iBarWidth: 0, iLoadGap: null,
                sX: null, sXInner: null, sY: null
            },
            oLanguage: {fnInfoCallback: null},
            oBrowser: {bScrollOversize: false},
            aanFeatures: [],
            aoData: [],
            aiDisplay: [],
            aiDisplayMaster: [],
            aoColumns: [],
            aoHeader: [],
            aoFooter: [],
            asDataSearch: [],
            oPreviousSearch: {},
            aoPreSearchCols: [],
            aaSorting: null,
            aaSortingFixed: null,
            asStripeClasses: null,
            asDestroyStripes: [],
            sDestroyWidth: 0,
            aoRowCallback: [],
            aoHeaderCallback: [],
            aoFooterCallback: [],
            aoDrawCallback: [],
            aoRowCreatedCallback: [],
            aoPreDrawCallback: [],
            aoInitComplete: [],
            aoStateSaveParams: [],
            aoStateLoadParams: [],
            aoStateLoaded: [],
            sTableId: "",
            nTable: null,
            nTHead: null,
            nTFoot: null,
            nTBody: null,
            nTableWrapper: null,
            bDeferLoading: false,
            bInitialised: false,
            aoOpenRows: [],
            sDom: null,
            sPaginationType: "two_button",
            iCookieDuration: 0,
            sCookiePrefix: "",
            fnCookieCallback: null,
            aoStateSave: [],
            aoStateLoad: [],
            oLoadedState: null,
            sAjaxSource: null,
            sAjaxDataProp: null,
            bAjaxDataGet: true,
            jqXHR: null,
            fnServerData: null,
            aoServerParams: [],
            sServerMethod: null,
            fnFormatNumber: null,
            aLengthMenu: null,
            iDraw: 0,
            bDrawing: false,
            iDrawError: -1,
            _iDisplayLength: 10,
            _iDisplayStart: 0,
            _iDisplayEnd: 10,
            _iRecordsTotal: 0,
            _iRecordsDisplay: 0,
            bJUI: null,
            oClasses: {},
            bFiltered: false,
            bSorted: false,
            bSortCellsTop: null,
            oInit: null,
            aoDestroyCallback: [],
            fnRecordsTotal: function () {
                return this.oFeatures.bServerSide ? parseInt(this._iRecordsTotal, 10) : this.aiDisplayMaster.length
            },
            fnRecordsDisplay: function () {
                return this.oFeatures.bServerSide ? parseInt(this._iRecordsDisplay, 10) : this.aiDisplay.length
            },
            fnDisplayEnd: function () {
                return this.oFeatures.bServerSide ? this.oFeatures.bPaginate === false ||
                this._iDisplayLength == -1 ? this._iDisplayStart + this.aiDisplay.length : Math.min(this._iDisplayStart + this._iDisplayLength, this._iRecordsDisplay) : this._iDisplayEnd
            },
            oInstance: null,
            sInstance: null,
            iTabIndex: 0,
            nScrollHead: null,
            nScrollFoot: null
        };
        l.ext = i.extend(true, {}, l.models.ext);
        i.extend(l.ext.oStdClasses, {
            sTable: "dataTable",
            sPagePrevEnabled: "paginate_enabled_previous",
            sPagePrevDisabled: "paginate_disabled_previous",
            sPageNextEnabled: "paginate_enabled_next",
            sPageNextDisabled: "paginate_disabled_next",
            sPageJUINext: "",
            sPageJUIPrev: "",
            sPageButton: "paginate_button",
            sPageButtonActive: "paginate_active",
            sPageButtonStaticDisabled: "paginate_button paginate_button_disabled",
            sPageFirst: "first",
            sPagePrevious: "previous",
            sPageNext: "next",
            sPageLast: "last",
            sStripeOdd: "odd",
            sStripeEven: "even",
            sRowEmpty: "dataTables_empty",
            sWrapper: "dataTables_wrapper",
            sFilter: "dataTables_filter",
            sInfo: "dataTables_info",
            sPaging: "dataTables_paginate paging_",
            sLength: "dataTables_length",
            sProcessing: "dataTables_processing",
            sSortAsc: "sorting_asc",
            sSortDesc: "sorting_desc",
            sSortable: "sorting",
            sSortableAsc: "sorting_asc_disabled",
            sSortableDesc: "sorting_desc_disabled",
            sSortableNone: "sorting_disabled",
            sSortColumn: "sorting_",
            sSortJUIAsc: "",
            sSortJUIDesc: "",
            sSortJUI: "",
            sSortJUIAscAllowed: "",
            sSortJUIDescAllowed: "",
            sSortJUIWrapper: "",
            sSortIcon: "",
            sScrollWrapper: "dataTables_scroll",
            sScrollHead: "dataTables_scrollHead",
            sScrollHeadInner: "dataTables_scrollHeadInner",
            sScrollBody: "dataTables_scrollBody",
            sScrollFoot: "dataTables_scrollFoot",
            sScrollFootInner: "dataTables_scrollFootInner",
            sFooterTH: "",
            sJUIHeader: "",
            sJUIFooter: ""
        });
        i.extend(l.ext.oJUIClasses, l.ext.oStdClasses, {
            sPagePrevEnabled: "fg-button ui-button ui-state-default ui-corner-left",
            sPagePrevDisabled: "fg-button ui-button ui-state-default ui-corner-left ui-state-disabled",
            sPageNextEnabled: "fg-button ui-button ui-state-default ui-corner-right",
            sPageNextDisabled: "fg-button ui-button ui-state-default ui-corner-right ui-state-disabled",
            sPageJUINext: "ui-icon ui-icon-circle-arrow-e",
            sPageJUIPrev: "ui-icon ui-icon-circle-arrow-w",
            sPageButton: "fg-button ui-button ui-state-default",
            sPageButtonActive: "fg-button ui-button ui-state-default ui-state-disabled",
            sPageButtonStaticDisabled: "fg-button ui-button ui-state-default ui-state-disabled",
            sPageFirst: "first ui-corner-tl ui-corner-bl",
            sPageLast: "last ui-corner-tr ui-corner-br",
            sPaging: "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",
            sSortAsc: "ui-state-default",
            sSortDesc: "ui-state-default",
            sSortable: "ui-state-default",
            sSortableAsc: "ui-state-default",
            sSortableDesc: "ui-state-default",
            sSortableNone: "ui-state-default",
            sSortJUIAsc: "css_right ui-icon ui-icon-triangle-1-n",
            sSortJUIDesc: "css_right ui-icon ui-icon-triangle-1-s",
            sSortJUI: "css_right ui-icon ui-icon-carat-2-n-s",
            sSortJUIAscAllowed: "css_right ui-icon ui-icon-carat-1-n",
            sSortJUIDescAllowed: "css_right ui-icon ui-icon-carat-1-s",
            sSortJUIWrapper: "DataTables_sort_wrapper",
            sSortIcon: "DataTables_sort_icon",
            sScrollHead: "dataTables_scrollHead ui-state-default",
            sScrollFoot: "dataTables_scrollFoot ui-state-default",
            sFooterTH: "ui-state-default",
            sJUIHeader: "fg-toolbar ui-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix",
            sJUIFooter: "fg-toolbar ui-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix"
        });
        i.extend(l.ext.oPagination, {
            two_button: {
                fnInit: function (h, n, q) {
                    var o = h.oLanguage.oPaginate, v = function (D) {
                        h.oApi._fnPageChange(h, D.data.action) && q(h)
                    };
                    o = !h.bJUI ? '<a class="' + h.oClasses.sPagePrevDisabled + '" tabindex="' + h.iTabIndex + '" role="button">' + o.sPrevious + '</a><a class="' +
                        h.oClasses.sPageNextDisabled + '" tabindex="' + h.iTabIndex + '" role="button">' + o.sNext + "</a>" : '<a class="' + h.oClasses.sPagePrevDisabled + '" tabindex="' + h.iTabIndex + '" role="button"><span class="' + h.oClasses.sPageJUIPrev + '"></span></a><a class="' + h.oClasses.sPageNextDisabled + '" tabindex="' + h.iTabIndex + '" role="button"><span class="' + h.oClasses.sPageJUINext + '"></span></a>';
                    i(n).append(o);
                    var w = i("a", n);
                    o = w[0];
                    w = w[1];
                    h.oApi._fnBindAction(o, {action: "previous"}, v);
                    h.oApi._fnBindAction(w, {action: "next"}, v);
                    if (!h.aanFeatures.p) {
                        n.id = h.sTableId + "_paginate";
                        o.id = h.sTableId + "_previous";
                        w.id = h.sTableId + "_next";
                        o.setAttribute("aria-controls", h.sTableId);
                        w.setAttribute("aria-controls", h.sTableId)
                    }
                }, fnUpdate: function (h) {
                    if (h.aanFeatures.p) for (var n = h.oClasses, q = h.aanFeatures.p, o, v = 0, w = q.length; v < w; v++) if (o = q[v].firstChild) {
                        o.className = h._iDisplayStart === 0 ? n.sPagePrevDisabled : n.sPagePrevEnabled;
                        o = o.nextSibling;
                        o.className = h.fnDisplayEnd() == h.fnRecordsDisplay() ? n.sPageNextDisabled : n.sPageNextEnabled
                    }
                }
            }, iFullNumbersShowPages: 5,
            full_numbers: {
                fnInit: function (h, n, q) {
                    var o = h.oLanguage.oPaginate, v = h.oClasses, w = function (G) {
                        h.oApi._fnPageChange(h, G.data.action) && q(h)
                    };
                    i(n).append('<a  tabindex="' + h.iTabIndex + '" class="' + v.sPageButton + " " + v.sPageFirst + '">' + o.sFirst + '</a><a  tabindex="' + h.iTabIndex + '" class="' + v.sPageButton + " " + v.sPagePrevious + '">' + o.sPrevious + '</a><span></span><a tabindex="' + h.iTabIndex + '" class="' + v.sPageButton + " " + v.sPageNext + '">' + o.sNext + '</a><a tabindex="' + h.iTabIndex + '" class="' + v.sPageButton + " " + v.sPageLast +
                        '">' + o.sLast + "</a>");
                    var D = i("a", n);
                    o = D[0];
                    v = D[1];
                    var A = D[2];
                    D = D[3];
                    h.oApi._fnBindAction(o, {action: "first"}, w);
                    h.oApi._fnBindAction(v, {action: "previous"}, w);
                    h.oApi._fnBindAction(A, {action: "next"}, w);
                    h.oApi._fnBindAction(D, {action: "last"}, w);
                    if (!h.aanFeatures.p) {
                        n.id = h.sTableId + "_paginate";
                        o.id = h.sTableId + "_first";
                        v.id = h.sTableId + "_previous";
                        A.id = h.sTableId + "_next";
                        D.id = h.sTableId + "_last"
                    }
                }, fnUpdate: function (h, n) {
                    if (h.aanFeatures.p) {
                        var q = l.ext.oPagination.iFullNumbersShowPages, o = Math.floor(q / 2), v =
                                Math.ceil(h.fnRecordsDisplay() / h._iDisplayLength),
                            w = Math.ceil(h._iDisplayStart / h._iDisplayLength) + 1, D = "", A, G = h.oClasses, E,
                            Y = h.aanFeatures.p, ma = function (R) {
                                h.oApi._fnBindAction(this, {page: R + A - 1}, function (ea) {
                                    h.oApi._fnPageChange(h, ea.data.page);
                                    n(h);
                                    ea.preventDefault()
                                })
                            };
                        if (h._iDisplayLength === -1) w = o = A = 1; else if (v < q) {
                            A = 1;
                            o = v
                        } else if (w <= o) {
                            A = 1;
                            o = q
                        } else if (w >= v - o) {
                            A = v - q + 1;
                            o = v
                        } else {
                            A = w - Math.ceil(q / 2) + 1;
                            o = A + q - 1
                        }
                        for (q = A; q <= o; q++) D += w !== q ? '<a tabindex="' + h.iTabIndex + '" class="' + G.sPageButton + '">' + h.fnFormatNumber(q) +
                            "</a>" : '<a tabindex="' + h.iTabIndex + '" class="' + G.sPageButtonActive + '">' + h.fnFormatNumber(q) + "</a>";
                        q = 0;
                        for (o = Y.length; q < o; q++) {
                            E = Y[q];
                            if (E.hasChildNodes()) {
                                i("span:eq(0)", E).html(D).children("a").each(ma);
                                E = E.getElementsByTagName("a");
                                E = [E[0], E[1], E[E.length - 2], E[E.length - 1]];
                                i(E).removeClass(G.sPageButton + " " + G.sPageButtonActive + " " + G.sPageButtonStaticDisabled);
                                i([E[0], E[1]]).addClass(w == 1 ? G.sPageButtonStaticDisabled : G.sPageButton);
                                i([E[2], E[3]]).addClass(v === 0 || w === v || h._iDisplayLength === -1 ? G.sPageButtonStaticDisabled :
                                    G.sPageButton)
                            }
                        }
                    }
                }
            }
        });
        i.extend(l.ext.oSort, {
            "string-pre": function (h) {
                if (typeof h != "string") h = h !== null && h.toString ? h.toString() : "";
                return h.toLowerCase()
            }, "string-asc": function (h, n) {
                return h < n ? -1 : h > n ? 1 : 0
            }, "string-desc": function (h, n) {
                return h < n ? 1 : h > n ? -1 : 0
            }, "html-pre": function (h) {
                return h.replace(/<.*?>/g, "").toLowerCase()
            }, "html-asc": function (h, n) {
                return h < n ? -1 : h > n ? 1 : 0
            }, "html-desc": function (h, n) {
                return h < n ? 1 : h > n ? -1 : 0
            }, "date-pre": function (h) {
                h = Date.parse(h);
                if (isNaN(h) || h === "") h = Date.parse("01/01/1970 00:00:00");
                return h
            }, "date-asc": function (h, n) {
                return h - n
            }, "date-desc": function (h, n) {
                return n - h
            }, "numeric-pre": function (h) {
                return h == "-" || h === "" ? 0 : h * 1
            }, "numeric-asc": function (h, n) {
                return h - n
            }, "numeric-desc": function (h, n) {
                return n - h
            }
        });
        i.extend(l.ext.aTypes, [function (h) {
            if (typeof h === "number") return "numeric"; else if (typeof h !== "string") return null;
            var n, q = false;
            n = h.charAt(0);
            if ("0123456789-".indexOf(n) == -1) return null;
            for (var o = 1; o < h.length; o++) {
                n = h.charAt(o);
                if ("0123456789.".indexOf(n) == -1) return null;
                if (n ==
                    ".") {
                    if (q) return null;
                    q = true
                }
            }
            return "numeric"
        }, function (h) {
            var n = Date.parse(h);
            if (n !== null && !isNaN(n) || typeof h === "string" && h.length === 0) return "date";
            return null
        }, function (h) {
            if (typeof h === "string" && h.indexOf("<") != -1 && h.indexOf(">") != -1) return "html";
            return null
        }]);
        i.fn.DataTable = l;
        i.fn.dataTable = l;
        i.fn.dataTableSettings = l.settings;
        i.fn.dataTableExt = l.ext
    })
})(window, document);
