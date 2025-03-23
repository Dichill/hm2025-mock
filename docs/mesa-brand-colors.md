# MESA Brand Colors

This document provides information about the official MESA color palette and how to use these colors in your application with Tailwind CSS.

## Color Palette Overview

The MESA colors create an overall warm palette that reflects the organization's identity.

### Primary Colors

| Color | Hex | RGB | CMYK | Tailwind Classes |
|-------|-----|-----|------|-----------------|
| **Warm Red** | `#FF4438` | `255, 69, 57` | `0/87/79/0` | `bg-mesa-warm-red` `text-mesa-warm-red` `border-mesa-warm-red` |
| **Grey 432** | `#676C72` | `103, 108, 114` | `62/50/45/15` | `bg-mesa-grey` `text-mesa-grey` `border-mesa-grey` |

### Secondary Colors (use to complement the primary colors)

| Color | Hex | RGB | CMYK | Tailwind Classes |
|-------|-----|-----|------|-----------------|
| **Yellow 107** | `#FFE550` | `255, 230, 81` | `0/7/78/0` | `bg-mesa-yellow-107` `text-mesa-yellow-107` `border-mesa-yellow-107` |
| **Yellow 116** | `#FFB607` | `255, 182, 10` | `0/34/95/0` | `bg-mesa-yellow-116` `text-mesa-yellow-116` `border-mesa-yellow-116` |
| **Orange 151** | `#FF893E` | `255, 137, 62` | `0/58/78/0` | `bg-mesa-orange` `text-mesa-orange` `border-mesa-orange` |
| **Rhodamine Red** | `#E94D97` | `234, 78, 152` | `2/84/3/0` | `bg-mesa-rhodamine` `text-mesa-rhodamine` `border-mesa-rhodamine` |

### Tertiary Colors (use minimally as a highlight color)

| Color | Hex | RGB | CMYK | Tailwind Classes |
|-------|-----|-----|------|-----------------|
| **Purple 2655** | `#A289D7` | `162, 137, 215` | `38/48/0/0` | `bg-mesa-purple` `text-mesa-purple` `border-mesa-purple` |
| **Green 367** | `#8DCF6A` | `141, 207, 106` | `47/0/77/0` | `bg-mesa-green` `text-mesa-green` `border-mesa-green` |

## Using Colors with Tailwind CSS

### Background Colors

```jsx
<div className="bg-mesa-warm-red">Warm Red Background</div>
<div className="bg-mesa-grey">Grey Background</div>
<div className="bg-mesa-yellow-107">Yellow 107 Background</div>
<div className="bg-mesa-yellow-116">Yellow 116 Background</div>
<div className="bg-mesa-orange">Orange Background</div>
<div className="bg-mesa-rhodamine">Rhodamine Background</div>
<div className="bg-mesa-purple">Purple Background</div>
<div className="bg-mesa-green">Green Background</div>
```

### Text Colors

```jsx
<p className="text-mesa-warm-red">Warm Red Text</p>
<p className="text-mesa-grey">Grey Text</p>
<p className="text-mesa-yellow-107">Yellow 107 Text</p>
<p className="text-mesa-yellow-116">Yellow 116 Text</p>
<p className="text-mesa-orange">Orange Text</p>
<p className="text-mesa-rhodamine">Rhodamine Text</p>
<p className="text-mesa-purple">Purple Text</p>
<p className="text-mesa-green">Green Text</p>
```

### Border Colors

```jsx
<div className="border border-mesa-warm-red">Warm Red Border</div>
<div className="border border-mesa-grey">Grey Border</div>
<div className="border border-mesa-yellow-107">Yellow 107 Border</div>
<div className="border border-mesa-yellow-116">Yellow 116 Border</div>
<div className="border border-mesa-orange">Orange Border</div>
<div className="border border-mesa-rhodamine">Rhodamine Border</div>
<div className="border border-mesa-purple">Purple Border</div>
<div className="border border-mesa-green">Green Border</div>
```

### Hover States

```jsx
<button className="bg-mesa-warm-red hover:bg-mesa-orange text-white">
  Button with hover effect
</button>

<a className="text-mesa-purple hover:text-mesa-rhodamine">
  Link with hover effect
</a>
```

### Opacity Variations

You can use opacity modifiers with any color:

```jsx
<div className="bg-mesa-warm-red/50">50% opacity Warm Red</div>
<div className="bg-mesa-yellow-116/75">75% opacity Yellow</div>
<div className="text-mesa-purple/90">90% opacity Purple text</div>
```

### Gradients

```jsx
<div className="bg-gradient-to-r from-mesa-warm-red to-mesa-orange">
  Gradient from Warm Red to Orange
</div>

<div className="bg-gradient-to-b from-mesa-yellow-107 to-mesa-yellow-116">
  Gradient from Yellow 107 to Yellow 116
</div>
```

### Color Combinations Examples

#### Primary Button
```jsx
<button className="bg-mesa-warm-red hover:bg-mesa-warm-red/90 text-white px-4 py-2 rounded-md">
  Primary Button
</button>
```

#### Secondary Button
```jsx
<button className="bg-mesa-grey hover:bg-mesa-grey/90 text-white px-4 py-2 rounded-md">
  Secondary Button
</button>
```

#### Call to Action Button
```jsx
<button className="bg-mesa-yellow-116 hover:bg-mesa-orange text-mesa-grey font-bold px-4 py-2 rounded-md">
  Call to Action
</button>
```

#### Alert or Notification
```jsx
<div className="bg-mesa-warm-red/10 border-l-4 border-mesa-warm-red text-mesa-warm-red p-4">
  Alert message goes here
</div>
```

#### Success Message
```jsx
<div className="bg-mesa-green/10 border-l-4 border-mesa-green text-mesa-green p-4">
  Success message goes here
</div>
```

#### Highlighted Content
```jsx
<div className="bg-mesa-purple/10 border border-mesa-purple/20 p-4 rounded-md">
  Highlighted content with tertiary color
</div>
``` 