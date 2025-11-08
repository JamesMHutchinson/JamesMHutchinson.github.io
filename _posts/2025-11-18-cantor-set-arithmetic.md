---
layout: post
title: Cantor Set Arithmetic
date: 2025-11-08 
description: combining fractals together
thumbnail: assets/img/levelcurvepic.png
related_posts: true
citation: true
featured: true
---

## Introduction
There's a wonderful result regarding the middle-third Cantor Set ($C$). Specifically that $C+C :=  \\{ x + y : x,y \in C \\}  = [0,2]$. 
The goal of this project is to understand results like these. It's a surprising result because the Cantor Set has no real 'length,' but adding two together yields an interval of length 2. At the same time, maybe it shouldn't be suprising because the cardinality of the Cantor Set, or its 'size' is the same size as the real numbers, which is also the same size as the interval $[0,2]$.

## The Middle-Third Cantor Set
The middle-third Cantor Set (hereby referred to as 'the Cantor Set' or $C$) is typically constructed iteratively. Take the unit interval, call it $C_0$. Now remove the open middle-third of every closed interval (in this step, the only closed interval is $[0,1]$). The result is $C_1 = [0,1/3] \cup [2/3,1].$ Repeat this process infinitely, obtaining $\displaystyle C = \bigcap^\infty C_n$.

An equivalent characterization of the Cantor Set is $\left\\{\displaystyle \sum_{k=0}^\infty \frac{a_k}{3^k}: a_k \in \\{0,2\\}\right\\}$, which is the set of all numbers whose base-$3$ representation consists only of the digits '$0$' and '$2$.'

Importantly, we can use an iterated function system (IFS) of affine contractions (think of functions which shrink sets) to describe removing open middle thirds of closed intervals.
The IFS which generates the Cantor Set is given by:

$$
\begin{align*}
f_1(x) &= 1/3\ x\\
f_2(x) &= 1/3\ x + 2/3
\end{align*}
$$

You can see more details in my [Sierpiński Carpet project](/researchinterest/2025/sierpinski-carpet/), but the most important property here is the following equation:


\begin{equation}
C_{n+1} = f_1(C_n) \cup f_2(C_n).
\label{eq:IFS}
\end{equation}


## $C+C = [0,2]$
The proof technique is as follows: consider the function $x+y=s,\ s \in [0,2]$. We need to show that for all $n$, $\\{x_n+y_n: x_n,y_n \in C_n \\} = [0,2]$. Once proven, we have a sequence of $x_n,y_n$ such that $x_n + y_n =s$. Since $(x_n)$ is bounded, we know that there exists a convergent subsequence $(x_{n_k})$ (by Bolzano-Weierstrass Theorem). Let $x = \lim_{k\to\infty} x_{n_k}$ and $y = \lim_{k\to \infty} s- x_{n_k}$, which implies $x+y = s$. Then we show that $x,y \in C$ by the following: for any natural $N$, when $n_k \ge N$, $x_{n_k} \in C_N$, and since $C_n$ is closed, $x\in C_n$. This implies $x$ is an element of every $C_n$, so $x \in \bigcap C_n = C$. Similar reasoning implies $y \in \bigcap C_n = C.$ Hence we have that $x+y = s$, where $s \in [0,2]$ and $x,y \in C$.

So how do we show that $\forall n \in \mathbb{N},\ \\{x_n+y_n: x_n,y_n \in C_n \\} = [0,2]$? The set of all points $(x,y)$ that satisfy $x+y = s$ can be graphed. For ease, let's solve for $y$ and obtain $y = s-x$.

<img class="card-img" src="/assets/img/s-x-c0.png" alt="image">
<div class="caption">
    $y=s-x$
</div>

Now consider $\\{x_1+y_1 : x_1,y_1 \in C_1 \\}$. How do we show that it equals $[0,2]$? We're really asking if the curve $y=s-x$ intersects $C_1 \times C_1$ for $s\in[0,2]$. $C_1 \times C_1$, when graphed, looks like four squares pictured below.

<img class="card-img" src="/assets/img/s-x-c1.png" alt="image">
<div class="caption">
    $y=s-x$, $C_1 \times C_1$
</div>

It is true that the curve always intersects at least one of these squares:
$$
\begin{align*}
C_1 +C_1 &= ([0,1/3] \cup [2/3,1]) + ([0,1/3] \cup [2/3,1])\\
         &= ([0,1/3] +[0,1/3]) \cup ([0,1/3]+[2/3,1]) \cup ([2/3,1]+[0,1/3]) \cup ([2/3,1]+[2/3,1])\\
         &= [0,2/3] \cup [2/3,4/3] \cup [2/3,4/3] \cup [4/3,2]\\
         &= [0,2]
\end{align*}
$$

You can see how the squares subdivide as you increase $n$:
<img class="card-img" src="/assets/img/s-x-c2.png" alt="image">
<div class="caption">
    $y=s-x$, $C_2 \times C_2$
</div>

And for fun, let's see $n=4$:
<img class="card-img" src="/assets/img/s-x-c4.png" alt="image">
<div class="caption">
    $y=s-x$, $C_4 \times C_4$
</div>

To actually prove it, I used induction and equation \eqref{eq:IFS}.

## $C^2 \cdot C = [0,1]$

The research question is to find a similar geometric argument for the fact that $\\{x^2y: x,y \in C\\} = [0,1]$. It was originally proven in 2017 by Arthreya et. al 2019 (2017 arXiv preprint), but I want to prove it using level curves and intersecting squares. You can find my incomplete writeup, as well as references below.

<object data="/assets/pdf/11-1-2025 Proof.pdf" width="1000" height="1000" type='application/pdf'></object>

Below you can find the rough python code I used throughout the project to visualize how the level curve intersects squares. Neither efficiency nor good coding practices were considered.

{% highlight python linenos %}

from fractions import Fraction
from collections import Counter
import math
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import Slider, Button
import matplotlib.patches as patches


cn =[[(0,1)],[(0,Fraction(1,3)),(Fraction(2,3),1)]]
columns=2

def cmaker(n, display=True):
    offset=len(cn)
    for i in range(offset, n+1):
        cn.append([])
        for tup in cn[i-1]:
            t=Fraction(tup[1]-tup[0],3)
            cn[i].append((tup[0],tup[0]+t))
            cn[i].append((tup[0]+2*t, tup[1]))
    if display==True:
        for i in range(0,n+1):
            print("Cantor Construction Stage " + str(i))
            clean=["["+str(u)+","+str(v)+"]" for u,v in cn[i]]
            width=max(len(interval) for interval in clean) +2
            for j in range(0,len(cn[i]), columns):
                row= clean[j:j+columns]
                print("".join(f"{s:<{width}}" for s in row))
            print("")

def f3line(x,s):
    return (27*s)/(x+2)**2

def f4line(x,s):
    return ((27*s)/(x+2)**2 -2)

def straightline(x,s):
    return s-x

def fline(x,s):
    return s/(x**2)

FUNCTIONS = {
"fline": {
    "fn": fline,
    "smin": 0.001,
    "smax": 1.0,
    "sinit":0.001,
    "label": r"$y=\dfrac{s}{x^2}$"},
"f3line": {
    "fn": f3line,
    "smin": 0.0,
    "smax": 1/3,
    "sinit": 0.0,
    "label": r"$y=\dfrac{27s}{(x+2)^2}$"},
"f4line": {
    "fn": f4line,
    "smin": 8/27,
    "smax": 1,
    "sinit": 8/27,
    "label": r"$y=\dfrac{27s}{(x+2)^2} - 2$"},
"straightline": {
"fn": straightline,
"smin": 0.0,
"smax": 2.0,
"sinit": 0.0,
"label": r"$y=s-x$"}
}

def plotter():
    plt.close('all')
    rect = []
    cmaker(5,0)


    def makerectangles(n):
        nonlocal rect

        for r in rect:
            r.remove()
        rect.clear()
    
        for u,v in cn[n]:
            for x,y in cn[n]:
                rect.append(patches.Rectangle(
                    (u,x),
                    1/3**n,
                    1/3**n,
                    linewidth=1,
                    edgecolor='slategrey',
                    facecolor='lightsteelblue',
                    alpha=.8
                    ))
        for r in rect:
            ax.add_patch(r)
            
        fig.canvas.draw_idle()
            
            
    x=np.linspace(0,1,1000)
    currentname = 'f3line'
    currentfunc= FUNCTIONS[currentname]
    y0 = currentfunc['fn'](x,currentfunc['sinit'])

    fig, ax = plt.subplots(figsize=(6,6))
    (line,) = ax.plot(x, y0, lw=2)

    ax.set_xlim(0,1)
    ax.set_ylim(0,1)

    ax.set_xlabel(r'$x$ (increasing $\to$)')
    ax.set_ylabel(r'$y$ (increasing $\to$)')

    ax.spines['top'].set_visible(False)
    ax.spines['left'].set_visible(True)
    ax.spines['bottom'].set_visible(True)
    ax.spines['right'].set_visible(False)

    ax.set_aspect('equal')
    ax.set_xticks(np.linspace(0, 1, 4))
    ax.set_yticks(np.linspace(0, 1, 4))

    plt.subplots_adjust(bottom=0.25,right = 0.9)  # space for the slider
    ax_s = plt.axes([0.15, 0.08, 0.7, 0.04])  # [left, bottom, width, height] in figure coords
    ax_n = plt.axes([0.92, 0.15, 0.02, 0.70])  # [left, bottom, width, height]
    n_slider = Slider(
        ax=ax_n,
        label='n',
        valmin=0,
        valmax=5,
        valinit=0,
        valstep=1,
        orientation='vertical',
        valfmt='%0.0f'
    )

    ax_b1= plt.axes([0.325, 0.015, 0.15, 0.06])
    ax_b2= plt.axes([0.675, 0.015, 0.15, 0.06])
    ax_b3= plt.axes([0.15, 0.015, 0.15, 0.06])
    ax_b4= plt.axes([0.50, 0.015, 0.15, 0.06])
    
    b1= Button(ax_b1, r"$y=\dfrac{27s}{(x+2)^2}$")
    b2= Button(ax_b2, r"$y=s-x$")
    b3= Button(ax_b3, r"$y=\dfrac{s}{x^2}$")
    b4= Button(ax_b4, r"$y=\dfrac{27s}{(x+2)^2} - 2$")

    sliderRef = {'obj': None}

    def makeslider(name):
        ax_s.cla()
        currentfunc = FUNCTIONS[name]
        slider = Slider(ax=ax_s,
                   label = "s",
                   valmin = currentfunc['smin'],
                   valmax=currentfunc['smax'],
                   valinit=currentfunc['sinit'],
                   valstep = 0.0001)
        sliderRef['obj']=slider
        slider.on_changed(onsliderchange)
        return slider


    def onsliderchange(_):
        s = sliderRef["obj"].val
        f = FUNCTIONS[currentname]["fn"]
        Y = f(x, s)
        line.set_ydata(Y)
        fig.canvas.draw_idle()

    slider_slider= makeslider(currentname)


    def set_function(name):
        nonlocal currentname
        currentname = name
        currentfunc = FUNCTIONS[name]
        makeslider(name)
        Y = currentfunc["fn"](x, currentfunc["sinit"])
        line.set_ydata(Y)
        ax.set_title(f"Function: {currentfunc['label']}")
        fig.canvas.draw_idle()

    def onnchange(_):
        n_now = int(n_slider.val)
        makerectangles(n_now)

    n_slider.on_changed(onnchange)
    b1.on_clicked(lambda event: set_function("f3line"))
    b2.on_clicked(lambda event: set_function("straightline"))
    b3.on_clicked(lambda event: set_function("fline"))
    b4.on_clicked(lambda event: set_function("f4line"))

    makerectangles(0)
    ax.set_title(f"Function: {currentfunc['label']}")
    
    plt.show()

{% endhighlight %}