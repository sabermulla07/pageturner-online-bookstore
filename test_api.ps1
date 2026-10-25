# =====================================================================
# Automated Test Script: Online Book Store (Spring Boot + MySQL)
# =====================================================================

Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host "  Online Book Store - Automated Verification Test Suite" -ForegroundColor Cyan
Write-Host "=====================================================================" -ForegroundColor Cyan

$baseUrl = "http://localhost:8080/api"
$passed = 0
$total = 0

function Assert-Test {
    param(
        [string]$TestName,
        [scriptblock]$Action
    )
    $script:total++
    Write-Host "`n[Test $script:total] $TestName..." -NoNewline
    try {
        $result = & $Action
        if ($result -eq $true) {
            Write-Host " [PASS]" -ForegroundColor Green
            $script:passed++
        } else {
            Write-Host " [FAIL]" -ForegroundColor Red
        }
    } catch {
        Write-Host " [FAIL]: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# 1. Test Fetch All Books
Assert-Test "Fetch Catalogue Books (GET /api/books)" {
    $res = Invoke-RestMethod -Uri "$baseUrl/books" -Method Get
    Write-Host "`n   -> Received $($res.data.Count) books in catalogue" -ForegroundColor DarkGray
    return ($res.success -eq $true -and $res.data.Count -gt 0)
}

# 2. Test Fetch Distinct Categories
Assert-Test "Fetch Categories (GET /api/books/categories)" {
    $res = Invoke-RestMethod -Uri "$baseUrl/books/categories" -Method Get
    Write-Host "`n   -> Categories: $($res.data -join ', ')" -ForegroundColor DarkGray
    return ($res.success -eq $true -and $res.data.Count -gt 0)
}

# 3. Test Search Books by Keyword
Assert-Test "Filter Books by Category 'Computer Science'" {
    $res = Invoke-RestMethod -Uri "$baseUrl/books?category=Computer+Science" -Method Get
    Write-Host "`n   -> Computer Science books found: $($res.data.Count)" -ForegroundColor DarkGray
    return ($res.success -eq $true -and $res.data.Count -gt 0)
}

# 4. Test User Authentication (Demo Login)
Assert-Test "User Login with Demo Account (POST /api/auth/login)" {
    $body = @{ email = "demo@bookstore.com"; password = "password123" } | ConvertTo-Json
    $res = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $body -ContentType "application/json"
    Write-Host "`n   -> Logged in as: $($res.user.fullName) ($($res.user.email))" -ForegroundColor DarkGray
    return ($res.success -eq $true -and $res.user.fullName -eq "Saber Mulla")
}

# 5. Test User Registration (MySQL Database Persistence)
$rand = Get-Random
$testEmail = "auto_tester_$rand@vit.edu"
Assert-Test "Register New User in MySQL (POST /api/auth/register)" {
    $body = @{
        fullName = "Test Engineer $rand"
        email = $testEmail
        password = "securePassword!123"
        confirmPassword = "securePassword!123"
        phone = "+91 9898989898"
        address = "VIT Campus, Pune"
    } | ConvertTo-Json
    $res = Invoke-RestMethod -Uri "$baseUrl/auth/register" -Method Post -Body $body -ContentType "application/json"
    Write-Host "`n   -> User registered with ID: $($res.user.id), Email: $($res.user.email)" -ForegroundColor DarkGray
    return ($res.success -eq $true -and $res.user.id -gt 0)
}

# 6. Test New User Login
Assert-Test "Login Newly Registered User (POST /api/auth/login)" {
    $body = @{ email = $testEmail; password = "securePassword!123" } | ConvertTo-Json
    $res = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method Post -Body $body -ContentType "application/json"
    Write-Host "`n   -> Verified login for: $($res.user.fullName)" -ForegroundColor DarkGray
    return ($res.success -eq $true)
}

# 7. Test Duplicate Registration Prevention
Assert-Test "Prevent Duplicate Email Registration" {
    $body = @{
        fullName = "Duplicate Check"
        email = $testEmail
        password = "securePassword!123"
        confirmPassword = "securePassword!123"
    } | ConvertTo-Json
    try {
        $res = Invoke-RestMethod -Uri "$baseUrl/auth/register" -Method Post -Body $body -ContentType "application/json"
        return $false
    } catch {
        return ($_.Exception.Response.StatusCode.value__ -eq 400)
    }
}

# 8. Test Place Order
Assert-Test "Place Order in MySQL (POST /api/orders)" {
    $body = @{
        customerName = "Test Engineer $rand"
        userEmail = $testEmail
        shippingAddress = "Department of IT, VIT Pune"
        items = @(
            @{ bookId = 1; bookTitle = "Clean Code"; price = 49.99; quantity = 1 },
            @{ bookId = 3; bookTitle = "Designing Data-Intensive Applications"; price = 54.99; quantity = 1 }
        )
    } | ConvertTo-Json
    $res = Invoke-RestMethod -Uri "$baseUrl/orders" -Method Post -Body $body -ContentType "application/json"
    Write-Host "`n   -> Order Number: $($res.data.orderNumber), Total Amount: `$$($res.data.totalAmount)" -ForegroundColor DarkGray
    return ($res.success -eq $true -and $res.data.orderNumber -ne $null)
}

Write-Host "`n=====================================================================" -ForegroundColor Cyan
Write-Host "  Test Summary: $passed / $total Passed" -ForegroundColor $(if ($passed -eq $total) { "Green" } else { "Yellow" })
Write-Host "=====================================================================" -ForegroundColor Cyan
