from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.models import User, auth
from dashboard.models import *
from dashboard.crypt import *
# Create your views here.


def homepage(request):
    if request.user.is_authenticated:
        try:
            key = request.session['key']
        except:
            return logout(request)

        if request.method == 'POST':
            form_id = request.POST['id']
            if form_id == '1':
                website = request.POST['website']
                username = request.POST['username']
                password = request.POST['password']
                notes = request.POST['notes']
                url = Website.objects.get_or_create(url=website)[0]

                encrypted_password = encrypt(key, password)
                encrypted_notes = encrypt(key, notes)

                User_Password.objects.get_or_create(
                    user=request.user, website=url, username=username, password=encrypted_password, note=encrypted_notes)

            elif form_id == '2':
                username = request.POST['edit_name']
                password = request.POST['edit_password']
                note = request.POST['edit_notes']
                pk = request.POST['primary-key']

                info = User_Password.objects.get(pk=pk)
                info.username = username
                info.password = encrypt(key, password)
                info.note = encrypt(key, note)
                info.save()

            elif form_id == '3':
                pk = request.POST['primary-key']
                info = User_Password.objects.get(pk=pk)
                info.delete()
            
            elif form_id == '4':
                tagName = request.POST['tag_name']
                Tag.objects.get_or_create(user=request.user, tag_name=tagName)
            
            elif form_id == '5':
                tag_id = request.POST['tag_id']
                pass_id = request.POST['password_id'] 
                password = User_Password.objects.get(pk=pass_id)
                tag = Tag.objects.get(pk=tag_id)
                tag.password.remove(password)
            elif form_id == '6':
                tag_id = request.POST['add_tag_id']
                pass_id = request.POST['password_id']
                tag = Tag.objects.get(pk=tag_id)
                password = User_Password.objects.get(pk=pass_id)
                tag.password.add(password)
            return redirect('/')

        tags = Tag.objects.filter(user=request.user)
        passwords = User_Password.objects.filter(user=request.user)

        for password in passwords:
            password.tag_list = password.tag_set.all()
            password.decrypted_password = decrypt(key, password.password)
            password.decrypted_note = decrypt(key, password.note)

        return render(request, 'dashboard/dashboard.html', {'tags': tags, 'passwords': passwords})
    return render(request, 'accounts/index.html')


def login(request):
    if request.user.is_authenticated:
        return redirect('/')
    if request.method == 'POST':
        username = request.POST['name']
        password = request.POST['password']

        user = auth.authenticate(username=username, password=password)

        if user is not None:
            request.session['key'] = make_key(user.password, password)
            auth.login(request, user)
            return redirect('/')
        else:
            messages.info(request, 'Invalid Credentials')
            return redirect('/login')
    else:
        return render(request, 'accounts/login.html')


def register(request):
    if request.method == 'POST':
        username = request.POST['name']
        email = request.POST['email']
        password1 = request.POST['password1']

        if User.objects.filter(username=username).exists():
            messages.info(request, 'Username taken', extra_tags='username')
            return redirect('/register')
        elif User.objects.filter(email=email).exists():
            messages.info(
                request, 'Account already exist on the email', extra_tags='email')
            return redirect('/register')
        else:
            user = User.objects.create_user(
                username=username, password=password1, email=email)
            user.save()

            return redirect('/')
    else:
        return render(request, 'accounts/register.html')


def logout(request):
    try:
        del request.session['key']
    except:
        pass

    auth.logout(request)
    return redirect('/')
