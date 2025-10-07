# beatingdemo.py
# Script that demonstrates the beating of two signals
# Equivalent to MATLAB's beatingdemo.m
# F. Cegla (translated to Python by ChatGPT)

import numpy as np
import matplotlib.pyplot as plt

# =========================================================================
# Time vector
t = np.arange(0, 1.001, 0.001)  # same as 0:0.001:1 in MATLAB

# Signals
y = np.sin(2 * np.pi * 20 * t) + np.sin(2 * np.pi * 25 * t)
x = np.sin(2 * np.pi * 20 * t) + np.sin(2 * np.pi * 30 * t)

# Plot y
plt.figure()
plt.plot(t, y)
plt.xlabel('Time (secs)')
plt.ylabel('Amplitude (arb.)')
plt.title('Beating of 20Hz and 25Hz Signals')

# Plot x
plt.figure()
plt.plot(t, x, 'r')
plt.xlabel('Time (secs)')
plt.ylabel('Amplitude (arb.)')
plt.title('Beating of 20Hz and 30Hz Signals')

plt.show()

# fftex.py
# -------------------------------------------------------------------------
# This script demonstrates the creation of a time-domain signal,
# the use of the Fast Fourier Transform (FFT) to examine its frequency content,
# and the effect of applying a simple low-pass filter in the frequency domain.
#
# Original MATLAB author: F. Cegla
# Python translation + extended comments: ChatGPT
# -------------------------------------------------------------------------

import numpy as np


# -------------------------------------------------------------------------
# STEP 1: Create the time vector and signal
# -------------------------------------------------------------------------
# Time between samples (sampling interval)
dt = 0.001  # seconds between points, corresponds to 1 kHz sample rate

# Create a 512-point time vector from 0 to 0.511 seconds (inclusive)
t = np.arange(0, 0.512, dt)  # equivalent to MATLAB: 0:0.001:0.511

# Construct the signal:
#   - 30 Hz sine wave with amplitude 1
#   - 200 Hz sine wave with amplitude 0.2
xt = np.sin(2 * np.pi * 30 * t) + 0.2 * np.sin(2 * np.pi * 200 * t)

# -------------------------------------------------------------------------
# STEP 2: Plot the raw time-domain signal
# -------------------------------------------------------------------------
plt.figure()
plt.plot(t, xt)
plt.xlabel('Time (sec)')
plt.ylabel('Amplitude')
plt.title('Raw Time Trace')
plt.grid(True)
plt.show(block=False)  # Show but don't block script execution
input("Press Enter to continue...")  # MATLAB 'pause' equivalent

# -------------------------------------------------------------------------
# STEP 3: Perform the FFT (Fast Fourier Transform)
# -------------------------------------------------------------------------
# FFT converts time-domain signal to frequency-domain representation.
# The result is a complex array of 512 points.
xf = np.fft.fft(xt, 512)

# -------------------------------------------------------------------------
# STEP 4: Compute magnitude spectrum
# -------------------------------------------------------------------------
# The magnitude of each complex FFT value is sqrt(real^2 + imag^2)
modxf = np.abs(xf)

# -------------------------------------------------------------------------
# STEP 5: Define frequency axis
# -------------------------------------------------------------------------
# Frequency resolution Δf = 1 / Total_time
T = 0.512  # seconds (duration of time vector)
df = 1 / T
# Frequencies up to Nyquist (half sampling rate): 256 points
f = df * np.arange(0, 256)

# -------------------------------------------------------------------------
# STEP 6: Plot the raw spectrum (logarithmic y-axis)
# -------------------------------------------------------------------------
plt.figure()
plt.semilogy(f, modxf[0:256])  # log scale for magnitude
plt.xlabel('Frequency (Hz)')
plt.ylabel('Amplitude (log scale)')
plt.title('Raw Spectrum')
plt.grid(True)
plt.show(block=False)
input("Press Enter to continue...")

# -------------------------------------------------------------------------
# STEP 7: Inverse FFT (time-domain reconstruction)
# -------------------------------------------------------------------------
yt = np.fft.ifft(xf)  # returns complex, but should be nearly real

plt.figure()
plt.plot(t, np.real(yt[0:512]))  # plot only real part
plt.xlabel('Time (sec)')
plt.ylabel('Amplitude')
plt.title('Inverse FFT of Raw Spectrum')
plt.grid(True)
plt.show(block=False)
input("Press Enter to continue...")

# -------------------------------------------------------------------------
# STEP 8: Apply a simple low-pass filter
# -------------------------------------------------------------------------
# The FFT array is symmetric: points [1:filt] and [513-filt:end] are mirrored.
# To low-pass, we zero out all frequency components above a cutoff index.

filt = 30  # cutoff index (not frequency in Hz)
# In this case, 29 / 0.512 = 56.6 Hz cutoff approximately.
xf[filt:512-filt] = 1e-10  # Set unwanted frequencies to near zero

# Compute the new magnitude spectrum after filtering
modxf = np.abs(xf)

# -------------------------------------------------------------------------
# STEP 9: Plot filtered spectrum
# -------------------------------------------------------------------------
plt.figure()
plt.semilogy(f, modxf[0:256])
plt.xlabel('Frequency (Hz)')
plt.ylabel('Amplitude (log scale)')
plt.title('Filtered Spectrum (Low-Pass)')
plt.grid(True)
plt.show(block=False)
input("Press Enter to continue...")

# -------------------------------------------------------------------------
# STEP 10: Inverse FFT of filtered signal
# -------------------------------------------------------------------------
yt_filtered = np.fft.ifft(xf)

plt.figure()
plt.plot(t, np.real(yt_filtered))
plt.xlabel('Time (sec)')
plt.ylabel('Amplitude')
plt.title('Inverse FFT of Filtered Spectrum')
plt.grid(True)
plt.show()

# -------------------------------------------------------------------------
# END OF SCRIPT
# -------------------------------------------------------------------------
