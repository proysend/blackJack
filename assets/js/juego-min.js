const miModulo = (() => { "use strict"; let e = []; const t = ["C", "D", "H", "S"],
        o = ["A", "J", "Q", "K"]; let n = [];
    document.querySelector("#btnNuevo"); const r = document.querySelector("#btnPedir"),
        a = document.querySelector("#btnDetener"),
        l = document.querySelectorAll(".divCartas"),
        s = document.querySelectorAll("small"),
        d = () => { e = []; for (let o = 2; o <= 10; o++)
                for (let n of t) e.push(o + n); for (let n of t)
                for (let t of o) e.push(t + n); return _.shuffle(e) },
        c = () => { if (0 === e.leng) throw "No quedan más cartas en el Deck"; return e.pop() },
        u = (e, t) => (n[t] = n[t] + (e => { const t = e.substring(0, e.length - 1); return isNaN(t) ? "A" === t ? 11 : 10 : 1 * t })(e), s[t].innerText = n[t], n[t]),
        i = (e, t) => { const o = document.createElement("img");
            o.classList.add("carta"), o.src = `assets/cartas/${e}.png`, l[t].append(o) },
        m = e => { let t = 0;
            do { const e = c();
                t = u(e, n.length - 1), i(e, n.length - 1) } while (t < e && e <= 21);
            (() => { const [e, t] = n;
                setTimeout(() => { t === e ? alert("nadie Gana") : e > 21 ? alert("Computadora Gana") : t > 21 ? alert("Jugador Gana") : alert("Computadora Gana") }, 100) })() }; return r.addEventListener("click", () => { const e = c(),
            t = u(e, 0);
        i(e, 0), t > 21 ? (console.warn("Lo Siento Mucho, perdiste"), r.disabled = !0, a.disabled = !0, m(t)) : 21 === t && (console.warn("Has Logrado los 21 Puntos"), r.disabled = !0, a.disabled = !0, m(t)) }), a.addEventListener("click", () => { r.disabled = !0, a.disabled = !0, m(n[0]) }), { nuevoJuego: (t = 2) => { e = d(), n = []; for (let e = 0; e < t; e++) n.push(0);
            s.forEach(e => e.innerText = 0), l.forEach(e => e.innerHTML = ""), r.disabled = !1, a.disabled = !1 } } })();